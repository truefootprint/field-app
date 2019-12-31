import useMyData from "./use_my_data";
import combineData from "../helpers/combine_data";
import Response from "../models/response";
import ResponsePresenter from "../presenters/response_presenter";

const useCombinedData = (options) => {
  const myData = useMyData(options);
  const [combined, setCombined] = useState();

  useEffect(() => { combine(); }, [myData]);

  const combine = async () => {
    const responses = await Response.findAll({ raw: true });
    const presented = await ResponsePresenter.present(responses);
    const combined = combineData(myData, presented);

    setCombined(combined);
  };

  return combined;
};

export default useCombinedData;
