export const getAnimationClasses = (prevData, newData) => {
  const newAnimationClass = {};

  // Set fade-in animation for new items
  newData.forEach((item) => {
    if (!prevData.includes(item)) {
      newAnimationClass[item.name] = "fade-in";
    }
  });

  return newAnimationClass;
};


// clean fade-in class
export const clearFadeOutClasses = (duration, setAnimationClass) => {
  const timer = setTimeout(() => {
    setAnimationClass((prev) => {
      const updatedClass = { ...prev };
      Object.keys(updatedClass).forEach((key) => {
        if (updatedClass[key] === "fade-in") {
          delete updatedClass[key];
        }
      });
      return updatedClass;
    });
  }, duration);

  return timer;
};
