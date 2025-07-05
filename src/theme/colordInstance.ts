import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
import labPlugin from "colord/plugins/lab";

extend([mixPlugin, labPlugin]);

export default colord;
