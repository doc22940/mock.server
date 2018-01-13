// @flow
import EndpointsStore from './EndpointsStore';
import MethodStore from './MethodStore';

class RootStore {
	endpointsStore: EndpointsStore;
	methodStore: MethodStore;

	constructor() {
		this.endpointsStore = new EndpointsStore(this);
		this.methodStore = new MethodStore(this);
	}
}

export default RootStore;
