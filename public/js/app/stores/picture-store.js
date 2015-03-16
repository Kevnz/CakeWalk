import alt from '../alt';

import PictureActionCreators from '../actions/picture-action-creators';

class PictureStore {
	constructor(){
		this.bindActions(PictureActionCreators);
	}
}

export default alt.createStore(PictureStore, 'PictureStore');