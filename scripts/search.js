document.addEventListener('DOMContentLoaded', function () {
	const searchInput = document.getElementById('search-input')
	const products = document.querySelectorAll('.product')

	searchInput.addEventListener('input', function () {
		const searchQuery = searchInput.value.toLowerCase()

		products.forEach(product => {
			const productName = product.querySelector('h3').textContent.toLowerCase()
			if (productName.includes(searchQuery)) {
				product.style.display = 'block'
			} else {
				product.style.display = 'none'
			}
		})
	})
})
