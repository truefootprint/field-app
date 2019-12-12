import Layout from "../components/layout";
import Project from "../components/project";

const Home = ({ navigation }) => {
  const options = [{ key: "yes", value: "Yes" }, { key: "no", value: "No" }];

  const topic1 = { name: "topic 1" };
  const topic2 = { name: "topic 2" };

  const project = {
    name: "project name",
    activities: [
      {
        name: "activity 1",
        questions: [
          { text: "question 1", type: "free_text", placeholder: "placeholder", units: "units", topic: topic1 },
          { text: "question 2", type: "photo_upload", topic: topic1 },
          { text: "question 3", type: "multi_choice", options, topic: topic2 },
        ],
      },
      {
        name: "activity 2",
        questions: [
          { text: "question 4", type: "free_text", placeholder: "placeholder", units: "units", topic: topic2 },
        ],
      },
    ],
  };

  return (
    <Layout>
      <Project {...project} />
    </Layout>
  );
};

export default Home;
