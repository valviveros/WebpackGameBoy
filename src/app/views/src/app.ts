// cargamos lodash, por defecto los elementos a importar sin ruta serán buscados en los módulos de node
import * as _ from 'lodash';

// import html from '../views/test.html';
const gameBoy = require('../gameBoy.html');
import '../css/style.scss';
function component() {
    const element = document.createElement('div');
    
    // el caractér _ hace referencia a una biblioteca llamada lodash que será muy útil
    element.id = "app";
    
    return element;
}
const app = component();
const gameBoyFragment = document.createRange().createContextualFragment(gameBoy);
app.appendChild(gameBoyFragment);
document.body.appendChild(app);
require('./main');