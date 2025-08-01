
import { ListPlugin } from "@lexical/react/LexicalListPlugin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ListPluginWrapper: React.FC<any> = (props) => {
  return <ListPlugin hasStrictIndent={props.hasStrictIndent} />;
};

export default ListPluginWrapper;
