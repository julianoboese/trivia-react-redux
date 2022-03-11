async function getCategories() {
  try {
    const url = 'https://opentdb.com/api_category.php';
    const response = await fetch(url);
    const categories = await response.json();
    return categories.trivia_categories;
  } catch (error) {
    return error;
  }
}

export default getCategories;
