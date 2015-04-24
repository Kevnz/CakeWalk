'use strict';
import alt from '../alt';

import PictureActionCreators from '../actions/picture-action-creators';

class PictureStore {
	constructor(props){
        super(props);
		this.bindActions(PictureActionCreators);
        this.pictures = [];
	}
    getAllPictures(){

    }
}

export default alt.createStore(PictureStore, 'PictureStore');