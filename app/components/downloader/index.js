import downloadFile from "../../workflows/download_file";
import Attachment from "../../models/attachment";
import Button from "../button";
import NoWifi from "../no_wifi";
import styles from "./styles.js";

const Downloader = ({ color="blue", md5, children }) => {
  const { connected } = useContext(AppContext);

  const [downloaded, setDownloaded] = useState();
  const [failed, setFailed] = useState();

  const loadFile = async () => {
    setFailed(false);

    const attachment = await Attachment.findOne({ where: { md5 } });
    const exists = await File.exists(attachment.filename);
    if (exists) { setDownloaded(true); return; }

    // We either need to cancel or wait for existing downloads to finish
    // otherwise downloadFile returns false because there's one in progress.
    if (Download.inProgress()) await Download.resume();

    const success = await downloadFile(attachment.id);
    if (success) { setDownloaded(true); return; }

    setFailed(true);
  };

  useEffect(() => { loadFile(); }, []);

  const retryText = (
    <View {...className("downloader", styles)}>
      <Text>Download failed</Text>

      <View {...className("retry")}>
        <Button color={color} text="Retry" caps={false} fill={false} onPress={loadFile} />
      </View>
    </View>
  );

  const loadingText = (
    <View {...className("downloader", styles)}>
      <Text>Loading...</Text>
    </View>
  );

  const noWifi = (
    <View {...className("downloader", styles)}>
      <NoWifi />
    </View>
  );

  if (downloaded) return children;
  if (!connected) return noWifi;
  if (failed) return retryText;

  return loadingText;
};

export default Downloader;
