import products from './products.js';

const searchInput = document.getElementById('search');
const cartCount = document.getElementById('cart-count');
const filtersContainer = document.getElementById('filters-container');
const checkboxes = document.querySelectorAll('.check');
const productsWrapper = document.getElementById('products-wrapper');

// Add filter event listeners
filtersContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);


let cartItemCount = 0;
cartCount.textContent = cartItemCount;

let productElements = []

products.forEach(product => {  
    const productElement = addProductElement(product);
    productsWrapper.appendChild(productElement);
    productElements.push(productElement);

});

function addProductElement(product){
const productElement = document.createElement('div');

    productElement.className = 'item space-y-2';
    const imgContainer = document.createElement('div');
    imgContainer.className = 'bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl';
    const img = document.createElement('img');
    img.src = product.url;
    img.alt = product.name;
    img.className = 'w-full h-full object-cover';
    imgContainer.appendChild(img);
    const button = document.createElement('button');
    button.className = 'status bg-black text-white absolute bottom-0 right-0 left-0 text-center py-2 translate-y-full transition group-hover:translate-y-0';
    button.textContent = 'Add To Cart';
    imgContainer.appendChild(button);
    productElement.appendChild(imgContainer);

    const textContainer = document.createElement('div');
    textContainer.className = 'text-center';
    const productName = document.createElement('p');
    productName.className = 'text-xl';
    productName.textContent = product.name;
    textContainer.appendChild(productName);
    const price = document.createElement('strong');
    price.textContent = `$${product.price.toLocaleString()}`;
    textContainer.appendChild(price);
    productElement.appendChild(textContainer);

    button.addEventListener('click', updateCart);

    return productElement;
}

function updateCart(e){
    const button = e.target;

    if(button.classList.contains('added')){
        cartItemCount--;
        cartCount.textContent = cartItemCount;
        button.classList.remove('added');
        button.classList.remove('bg-red-500');
        button.classList.add('bg-black');
        button.textContent = 'Add To Cart';
    } else {
        cartItemCount++;
        cartCount.textContent = cartItemCount;
        button.classList.remove('bg-black');
        button.classList.add('added');
        button.classList.add('bg-red-500');
        button.textContent = 'Remove From Cart';

    }
    
}



function filterProducts(){
    const searchText = searchInput.value.trim().toLowerCase();
    const checkedCategories = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.id);
    
    productElements.forEach((productElement, index) => {
        const product = products[index];
        
        const searchMatch = product.name.toLowerCase().includes(searchText);
        const categoryMatch = checkedCategories.length === 0 || checkedCategories.includes(product.category);

        if(searchMatch && categoryMatch){
            productElement.classList.remove('hidden');
        }
        else {
            productElement.classList.add('hidden');
        }
    });
}
