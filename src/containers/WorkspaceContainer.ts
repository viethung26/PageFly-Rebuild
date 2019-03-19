import { Container } from "unstated";
import ElementContainer from './ElementContainer';

interface WorkspaceState {
    selected?: ElementContainer | null
}

export class WorkspaceContainer extends Container<WorkspaceState> {
    state = {
    }
}
export const workspaceContainer = new WorkspaceContainer()