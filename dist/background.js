/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./src/background.jsx ***!
  \****************************/
chrome.sidePanel.setPanelBehavior({
  openPanelOnActionClick: true
})["catch"](function (error) {
  return console.error(error);
});
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: 'wabisabi',
    title: 'Open side panel',
    contexts: ['all']
  });
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === 'wabisabi') {
    chrome.sidePanel.open({
      windowId: tab.windowId
    });
  }
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBQSxNQUFNLENBQUNDLFNBQVMsQ0FBQ0MsZ0JBQWdCLENBQUM7RUFBRUMsc0JBQXNCLEVBQUU7QUFBSyxDQUFDLENBQUMsU0FDekQsQ0FBQyxVQUFDQyxLQUFLO0VBQUEsT0FBS0MsT0FBTyxDQUFDRCxLQUFLLENBQUNBLEtBQUssQ0FBQztBQUFBLEVBQUM7QUFFM0NKLE1BQU0sQ0FBQ00sT0FBTyxDQUFDQyxXQUFXLENBQUNDLFdBQVcsQ0FBQyxZQUFNO0VBQ3pDUixNQUFNLENBQUNTLFlBQVksQ0FBQ0MsTUFBTSxDQUFDO0lBQ3ZCQyxFQUFFLEVBQUUsVUFBVTtJQUNkQyxLQUFLLEVBQUUsaUJBQWlCO0lBQ3hCQyxRQUFRLEVBQUUsQ0FBQyxLQUFLO0VBQ3BCLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQztBQUVGYixNQUFNLENBQUNTLFlBQVksQ0FBQ0ssU0FBUyxDQUFDTixXQUFXLENBQUMsVUFBQ08sSUFBSSxFQUFFQyxHQUFHLEVBQUs7RUFDckQsSUFBSUQsSUFBSSxDQUFDRSxVQUFVLEtBQUssVUFBVSxFQUFFO0lBQ2hDakIsTUFBTSxDQUFDQyxTQUFTLENBQUNpQixJQUFJLENBQUM7TUFBRUMsUUFBUSxFQUFFSCxHQUFHLENBQUNHO0lBQVMsQ0FBQyxDQUFDO0VBQ3JEO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93YWJpc2FiaS8uL3NyYy9iYWNrZ3JvdW5kLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJjaHJvbWUuc2lkZVBhbmVsLnNldFBhbmVsQmVoYXZpb3IoeyBvcGVuUGFuZWxPbkFjdGlvbkNsaWNrOiB0cnVlIH0pXHJcbiAgICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcblxyXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoKSA9PiB7XHJcbiAgICBjaHJvbWUuY29udGV4dE1lbnVzLmNyZWF0ZSh7XHJcbiAgICAgICAgaWQ6ICd3YWJpc2FiaScsXHJcbiAgICAgICAgdGl0bGU6ICdPcGVuIHNpZGUgcGFuZWwnLFxyXG4gICAgICAgIGNvbnRleHRzOiBbJ2FsbCddXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5jaHJvbWUuY29udGV4dE1lbnVzLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcigoaW5mbywgdGFiKSA9PiB7XHJcbiAgICBpZiAoaW5mby5tZW51SXRlbUlkID09PSAnd2FiaXNhYmknKSB7XHJcbiAgICAgICAgY2hyb21lLnNpZGVQYW5lbC5vcGVuKHsgd2luZG93SWQ6IHRhYi53aW5kb3dJZCB9KTtcclxuICAgIH1cclxufSk7XHJcbiJdLCJuYW1lcyI6WyJjaHJvbWUiLCJzaWRlUGFuZWwiLCJzZXRQYW5lbEJlaGF2aW9yIiwib3BlblBhbmVsT25BY3Rpb25DbGljayIsImVycm9yIiwiY29uc29sZSIsInJ1bnRpbWUiLCJvbkluc3RhbGxlZCIsImFkZExpc3RlbmVyIiwiY29udGV4dE1lbnVzIiwiY3JlYXRlIiwiaWQiLCJ0aXRsZSIsImNvbnRleHRzIiwib25DbGlja2VkIiwiaW5mbyIsInRhYiIsIm1lbnVJdGVtSWQiLCJvcGVuIiwid2luZG93SWQiXSwic291cmNlUm9vdCI6IiJ9