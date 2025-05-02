const productCards = document.querySelectorAll('.product-card');
const dragItemContainer = document.getElementById('dragItemContainer');
const modal = document.getElementById("productSelectionModal");
const productImagesDiv = document.getElementById("productImages");

function showProductSelectionModal() {
  modal.style.display = "block";
  productImagesDiv.innerHTML = "";

  productCards.forEach(card => {
    const imgUrl = card.dataset.productImage;
    const productName = card.dataset.productName;
    const productPrice = card.dataset.productPrice;

    const img = document.createElement("img");
    img.src = imgUrl;
    img.alt = productName;
    img.onclick = () => addProductToCart(productName, productPrice, imgUrl);

    productImagesDiv.appendChild(img);
  });
}

function addProductToCart(name, price, image) {
  const newItemHTML = `
          <div class="dragged-item-row">
            <img src="${image}" alt="${name}" class="dragged-item-image">
            <div class="dragged-item-details">
              ${name}
            </div>
            <div class="dragged-item-quantity">
              <button class="quantity-minus">-</button>
              <input type="number" class="quantity-input" value="1" min="1" max="10">
              <button class="quantity-plus">+</button>
            </div>
            <div class="dragged-item-price">₱ ${price}</div>
            <button class="remove-button">×</button>
          </div>
        `;
  dragItemContainer.innerHTML += newItemHTML;

  const removeButtons = dragItemContainer.querySelectorAll('.remove-button');
  removeButtons.forEach(button => {
    button.addEventListener('click', removeRow);
  });

  const quantityMinus = dragItemContainer.lastElementChild.querySelector('.quantity-minus');
  const quantityPlus = dragItemContainer.lastElementChild.querySelector('.quantity-plus');
  const quantityInput = dragItemContainer.lastElementChild.querySelector('.quantity-input');

  quantityMinus.addEventListener('click', decreaseQuantity);
  quantityPlus.addEventListener('click', increaseQuantity);

  modal.style.display = "none";
}

modal.addEventListener('click', function(event) {
  if (event.target === this) {
    modal.style.display = "none";
    productImagesDiv.innerHTML = "";
  }
});

function removeRow(event) {
  event.target.parentNode.remove();
}

function decreaseQuantity(event) {
  const quantityInput = event.target.parentNode.querySelector('.quantity-input');
  let quantity = parseInt(quantityInput.value);
  if (quantity > 1) {
    quantity--;
    quantityInput.value = quantity;
  }
}

function increaseQuantity(event) {
  const quantityInput = event.target.parentNode.querySelector('.quantity-input');
  let quantity = parseInt(quantityInput.value);
  if (quantity < 10) {
    quantity++;
    quantityInput.value = quantity;
  }
}

productCards.forEach(card => {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
});

dragItemContainer.addEventListener('dragover', dragOver);
dragItemContainer.addEventListener('dragenter', dragEnter);
dragItemContainer.addEventListener('dragleave', dragLeave);
dragItemContainer.addEventListener('drop', drop);

let draggedItem = null;

function dragStart(e) {
  draggedItem = e.target;
  this.style.opacity = '0.4';
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.outerHTML);
}

function dragEnd(e) {
  this.style.opacity = '1';
  draggedItem = null;
}

function dragOver(e) {
  e.preventDefault();
  this.classList.add('hovered');
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('dragged-over');
}

function dragLeave(e) {
  this.classList.remove('dragged-over');
}


function drop(e) {
  e.preventDefault();
  this.classList.remove('hovered');
  this.classList.remove('dragged-over');

  if (draggedItem) {
    const draggedHTML = e.dataTransfer.getData('text/html');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = draggedHTML;

    const productName = tempDiv.querySelector('.product-name').textContent;
    const productPrice = tempDiv.querySelector('.product-card').dataset.productPrice;
    const productImage = tempDiv.querySelector('.product-image').src;

    addProductToCart(productName, productPrice, productImage);
  }
}