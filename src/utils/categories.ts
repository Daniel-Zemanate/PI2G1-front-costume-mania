const CATEGORIES = {
  HALLOWEEN: "Halloween",
  DISNEY: "Disney",
  PROFESSIONS: "Professions",
  FANTASY: "Fantasy",
  SEXY: "Sexy",
  OLD_TIMES: "Old times",
};

export function getCategoryImage(category: string) {
  if (category === CATEGORIES.HALLOWEEN)
    return "https://images.unsplash.com/photo-1540593151139-583128ef5a84?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  if (category === CATEGORIES.DISNEY)
    return "https://images.unsplash.com/photo-1509635776280-892e4447ff86?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  if (category === CATEGORIES.PROFESSIONS)
    return "https://images.unsplash.com/photo-1606613816768-63888be4a54f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  if (category === CATEGORIES.FANTASY)
    return "https://images.unsplash.com/photo-1534375971785-5c1826f739d8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  if (category === CATEGORIES.OLD_TIMES)
    return "https://images.unsplash.com/photo-1676906242933-98a73e5441a7?q=80&w=1667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  if (category === CATEGORIES.SEXY)
    return "https://images.unsplash.com/photo-1593756286967-24f3756c187e?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return null;
}
