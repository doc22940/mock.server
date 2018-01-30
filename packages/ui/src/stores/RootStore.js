// @flow
import EndpointsStore from './EndpointsStore';
import MethodStore from './MethodStore';
import ClientConfigStore from './ClientConfigStore';
import HooksStore from './HooksStore';

class RootStore {
	endpointsStore: EndpointsStore;
	methodStore: MethodStore;
	clientConfigStore: ClientConfigStore;
	hooksStore: HooksStore;

	constructor() {
		this.endpointsStore = new EndpointsStore(this);
		this.methodStore = new MethodStore(this);
		this.clientConfigStore = new ClientConfigStore(this);
		this.hooksStore = new HooksStore(this);
	}
}

export default RootStore;
