import alt from '../alt';

//import PictureWebAPIUtils = require('../utils/PictureWebAPIUtils');

class PictureActions {
  selectPicture(picName) {
    this.dispatch(picName)
  }
}
export default alt.createActions(PictureActions);