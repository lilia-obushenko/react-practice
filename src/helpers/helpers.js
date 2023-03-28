import usersFromServer from '../api/users';
import categoriesFromServer from '../api/categories';
import productsFromServer from '../api/products';

function getCategory(categoryId) {
  return categoriesFromServer.find(category => category.id === categoryId);
}

function getOwner(ownerId) {
  return usersFromServer.find(user => user.id === ownerId);
}

const productsWithcategory = productsFromServer.map(product => ({
  ...product,
  category: getCategory(product.categoryId),
}));

export const products = productsWithcategory.map(product => ({
  ...product,
  owner: getOwner(product.category.ownerId),
}));

export const findProducts = (content, query) => content.toLowerCase()
  .includes(query.toLowerCase().trim());

export const filteredProducts = (
  productArray,
  query,
  person,
  selectedCategories,
) => {
  const shownProducts = productArray.filter(
    ({ name }) => findProducts(name, query),
  );

  if (!person && selectedCategories.length === 0) {
    return shownProducts;
  }

  if (selectedCategories.length > 0) {
    return shownProducts.filter(product => (
      selectedCategories.some(
        selCategory => selCategory.id === product.category.id,
      )));
  }

  return shownProducts.filter(product => product.owner.name === person.name);
};
