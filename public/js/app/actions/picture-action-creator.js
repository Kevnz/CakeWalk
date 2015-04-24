import alt from '../alt';

import api = require('../utils/PictureWebAPIUtils');

class PictureActions {
  selectPicture(picName) {
    this.dispatch(picName)
  }
}

class PictureActions {
    constructor() {
        this.generateActions(
                'receivePictures',
                'receivePicture'
            );
    }
    selectPicture(picName) {
        this.dispatch(picName);
        api.getPicure(picName);
    }

}
alt.createActions(ActionsCreators, exports);
export default alt.createActions(PictureActions);