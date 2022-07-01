const panels = document.querySelectorAll('.panel');

const myFuntion = (element) => {
  if (!element.classList.contains('acitve')) {
    element.classList.add('active');
    for (const panel of panels) {
      if (element !== panel) {
        panel.classList.remove('active');
      }
    }
  }
};
