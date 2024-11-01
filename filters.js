let filteredProducts = [...products];
const productsImages = document.querySelector('.products-images');

// Display Products
const displayProducts = () => {
  if(filteredProducts.length < 1) {
    productsImages.innerHTML = `<h4>Sorry, no products matched your search!</h4>`;
    return;
  }

  productsImages.innerHTML = filteredProducts.map((product) => {
      const {id, title, image} = product;
      const price = product.price.toFixed(2);

      return `<article class="product" data-id="${id}">
                <img src="${image}" class="product-img img" alt="${title}"/>
                <footer>
                  <h5 class="product-name">${title}</h5>
                  <span class="product-price">${price}</span>
                </footer>
          </article>`;
    }).join('');

  // filteredProducts.forEach((product) => {
  //   productsImages.innerHTML += 
  //   `<article class="product" data-id="${product.id}">
  //         <img src="${product.image}" class="product-img img" alt=""/>
  //         <footer>
  //            <h5 class="product-name">${product.title}</h5>
  //             <span class="product-price">${product.price}</span>
  //         </footer>
  //   </article>`;
  // });
};
displayProducts();

// Text Filter - Search Field
const form = document.querySelector('.form');
const searchInput = document.querySelector('.search-input');

form.addEventListener('keyup', () => {
  const inputValue = searchInput.value;

  filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(inputValue);
  });

  displayProducts();
  removeSelectedStore();
});

// Cosole Products
console.log(
  products.filter((product) => {
    return product.title.toLowerCase().includes('');
    // return product.title.toLowerCase().includes('sofa');
  })
);

// Display Filter Buttons
const storesDOM = document.querySelector('.stores');

const displayButtons = () => {
  const stores = products.map((product) => product.store);
  console.log(stores);

  const uniqueStores = new Set(stores);
  console.log(uniqueStores);

  //Set is a collection of unique values. Each value can only occur once in a Set.
  // const buttons = ['all', ...new Set(products.map((product) => product.store))];
  const buttons = ['all', ...uniqueStores];
  // console.log(buttons, typeof buttons);

  //It must be an array to use the map() method
  storesDOM.innerHTML = buttons.map((store) => {
      return `<button class='store-btn' data-id="${store}">${store}</button>`;
    }).join('');

  // buttons.forEach((store) => {
  //   storesDOM.innerHTML += `
  //   <button class="store-btn" data-id="${store}">${store}</button>
  //   `;
  // });
};
displayButtons();

// Select store
storesDOM.addEventListener('click', (e) => {
  const el = e.target;

  if(el.classList.contains('store-btn')) {
    console.log(el.getAttribute("data-id"));
    // const dataId = el.getAttribute("data-id");

    // if(dataId === "all")
    if(el.dataset.id === 'all') {
      filteredProducts = [...products];
    }
    else {
      filteredProducts = products.filter((product) => {
        return product.store === el.dataset.id;
      });
    }
    
    searchInput.value = '';
    displayProducts();
  }
});

// Change button color of selected store
const buttons = document.querySelectorAll('button');

function removeSelectedStore() {
  buttons.forEach((btn) => btn.classList.remove('color'));
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    removeSelectedStore();
    btn.classList.add('color');
  });
});