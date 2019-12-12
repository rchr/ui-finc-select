import {
  belongsTo,
  Model,
} from '@bigtest/mirage';

export default Model.extend({
  file: belongsTo('finc-select-filter'),
});
