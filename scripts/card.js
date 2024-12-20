let cart = []

// Обработка добавления в корзину
document.querySelectorAll('.add-to-cart').forEach(button => {
	button.addEventListener('click', function () {
		let product = this.closest('.product')
		let productName = product.querySelector('h3').textContent
		let productPrice = parseFloat(product.querySelector('.price').textContent)

		// Проверяем, есть ли уже этот товар в корзине
		let existingProduct = cart.find(item => item.name === productName)

		if (existingProduct) {
			// Если товар уже есть, увеличиваем количество
			existingProduct.quantity++
		} else {
			// Если товара нет в корзине, добавляем его
			cart.push({
				name: productName,
				price: productPrice,
				quantity: 1,
			})
		}

		updateCartModal()
	})
})

// Show and toggle cart modal
document.getElementById('view-cart').addEventListener('click', function () {
	let cartModal = document.getElementById('cart-modal')
	let items = JSON.parse(localStorage.getItem('myCart'))
	cart = items === null ? [] : items

	if (cartModal.style.display === 'block') {
		cartModal.style.display = 'none' // Закрыть при повторном клике
	} else {
		updateCartModal()
		cartModal.style.display = 'block' // Открыть модальное окно
	}
})

// Update cart modal
function updateCartModal() {
	let cartItemsDiv = document.getElementById('cart-items')
	let cartTotalP = document.getElementById('cart-total')

	// Clear previous content
	cartItemsDiv.innerHTML = ''
	let total = 0

	// Display each item in the cart
	cart.forEach(item => {
		let itemElement = document.createElement('div')
		itemElement.classList.add('cart-item')

		let itemNameElement = document.createElement('p')
		itemNameElement.textContent = `${item.name} - ${item.quantity} x ${item.price} грн`
		itemElement.appendChild(itemNameElement)

		// Создаем кнопку уменьшения
		let decreaseBtn = document.createElement('button')
		decreaseBtn.textContent = '-'
		decreaseBtn.classList.add('quantity-decrease')
		decreaseBtn.addEventListener('click', function () {
			if (item.quantity > 1) {
				item.quantity--
				updateCartModal()
			}
		})
		itemElement.appendChild(decreaseBtn)

		decreaseBtn.addEventListener('click', function () {
			if (item.quantity > 1) {
				item.quantity--
			} else {
				// Если количество товара 1, удаляем его из корзины
				cart = cart.filter(cartItem => cartItem.name !== item.name)
			}
			updateCartModal()
		})

		// Создаем кнопку увеличения
		let increaseBtn = document.createElement('button')
		increaseBtn.textContent = '+'
		increaseBtn.classList.add('quantity-increase')
		increaseBtn.addEventListener('click', function () {
			item.quantity++
			updateCartModal()
		})
		itemElement.appendChild(increaseBtn)

		cartItemsDiv.appendChild(itemElement)
		total += item.price * item.quantity
	})

	// Update total price
	cartTotalP.textContent = `Загальна сума: ${total} грн`

	// Save to localStorage
	localStorage.setItem('myCart', JSON.stringify(cart))
}

// Close the modal
document
	.querySelector('.cart-modal-close')
	.addEventListener('click', function () {
		document.getElementById('cart-modal').style.display = 'none'
	})

// Clear cart and reload
document.getElementById('delete-btn').addEventListener('click', function () {
	cart = []
	localStorage.clear()
	document.location.reload()
})

// Order button
document.getElementById('order-btn').addEventListener('click', function () {
	if (cart.length === 0) {
		alert('Кошик порожній!')
	} else {
		window.location = 'delivery.html'
		cart = []
		localStorage.clear()
		document.getElementById('cart-modal').style.display = 'none'
	}
})
