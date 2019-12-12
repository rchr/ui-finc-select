// import {
//   interactor,
//   isPresent,
//   scoped,
//   collection,
// } from '@bigtest/interactor';

// import NavigationInteractor from './navigation';

// export default @interactor class FilterFileInteractor {
//   static defaultScope = '[data-test-filters]';

//   instances = collection('[role=group] div a');
//   instance = scoped('#pane-filterdetails');
//   navigation = new NavigationInteractor();

//   isLoaded = isPresent('#pane-filterresults');
//   whenLoaded() {
//     return this.timeout(5000).when(() => this.isLoaded);
//   }
// }
