// Node/webpack will also break if './IonTypes.js' comes after './dom/index.js'
export { IonTypes } from './IonTypes.js';
import * as dom from './dom/index.js';
export { dom };
