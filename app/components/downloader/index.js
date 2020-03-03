import downloadFile from "../../workflows/download_file";
import Attachment from "../../models/attachment";
import Button from "../button";
import NoWifi from "../no_wifi";
import styles from "./styles.js";

const Downloader = ({ color="blue", path, children }) => {
  const { connected } = useContext(AppContext);

  const [downloaded, setDownloaded] = useState();
  const [failed, setFailed] = useState();

  const md5 = File.basename(path).split(".")[0];

  const loadFile = async () => {
    setFailed(false);

    const exists = await File.exists(path);
    if (exists) { setDownloaded(true); return; }

    // TODO: what should we do if the user hasn't uploaded the photo yet?
    // This will currently error when we should probably show some helpful text.
    const attachment = await Attachment.findOne({ where: { md5 } });
    if (!attachment) { throw new Error("No attachment for ", md5); }

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
