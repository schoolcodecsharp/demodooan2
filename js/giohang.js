
        // Dữ liệu giỏ hàng mẫu (sau này sẽ lấy từ localStorage hoặc API)
        let cart = [
            
        ];

        // Format tiền VND
        function formatMoney(amount) {
            return amount.toLocaleString('vi-VN') + '₫';
        }

        // Render giỏ hàng
        function renderCart() {
            const cartContent = document.getElementById('cartContent');
            const cartBadge = document.getElementById('cartBadge');
            
            // Cập nhật số lượng badge
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartBadge.textContent = totalItems;

            if (cart.length === 0) {
                cartContent.innerHTML = `
                    <div class="empty-cart">
                        <i class="fa fa-shopping-cart"></i>
                        <h2>Giỏ hàng của bạn đang trống</h2>
                        <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
                        <a href="../index.html" class="shop-now-btn">Mua sắm ngay</a>
                    </div>
                `;
                return;
            }

            // Tính toán
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = subtotal >= 500000 ? 0 : 30000;
            const discount = 0; // Có thể thêm logic giảm giá
            const total = subtotal + shipping - discount;

            // Render HTML
            let cartItemsHTML = '';
            cart.forEach((item, index) => {
                cartItemsHTML += `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}" class="item-image">
                        <div class="item-info">
                            <div class="item-name">${item.name}</div>
                            <div class="item-details">Size: ${item.size}</div>
                            <div class="item-price">${formatMoney(item.price)}</div>
                        </div>
                        <div class="item-actions">
                            <button class="remove-btn" onclick="removeItem(${index})">
                                <i class="fa fa-trash"></i>
                            </button>
                            <div class="quantity-control">
                                <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                                <input type="number" class="qty-input" value="${item.quantity}" min="1" readonly>
                                <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                            </div>
                        </div>
                    </div>
                `;
            });

            cartContent.innerHTML = `
                <div class="cart-content">
                    <div class="cart-items">
                        ${cartItemsHTML}
                    </div>
                    
                    <div class="cart-summary">
                        <div class="summary-title">Tóm tắt đơn hàng</div>
                        
                        <div class="summary-row">
                            <span class="summary-label">Tạm tính:</span>
                            <span class="summary-value">${formatMoney(subtotal)}</span>
                        </div>
                        
                        <div class="summary-row">
                            <span class="summary-label">Phí vận chuyển:</span>
                            <span class="summary-value">${shipping === 0 ? 'Miễn phí' : formatMoney(shipping)}</span>
                        </div>
                        
                        ${discount > 0 ? `
                        <div class="summary-row">
                            <span class="summary-label">Giảm giá:</span>
                            <span class="summary-value">-${formatMoney(discount)}</span>
                        </div>
                        ` : ''}
                        
                        <div class="coupon-section">
                            <label class="summary-label">Mã giảm giá:</label>
                            <div class="coupon-input">
                                <input type="text" placeholder="Nhập mã giảm giá" id="couponInput">
                                <button class="coupon-btn" onclick="applyCoupon()">Áp dụng</button>
                            </div>
                        </div>
                        
                        <div class="summary-row">
                            <span class="summary-label">Tổng cộng:</span>
                            <span class="summary-value summary-total">${formatMoney(total)}</span>
                        </div>
                        
                        <button class="checkout-btn" onclick="checkout()">
                            <i class="fa fa-credit-card"></i> Tiến hành thanh toán
                        </button>
                        
                        <div class="continue-shopping">
                            <a href="index.html"><i class="fa fa-arrow-left"></i> Tiếp tục mua sắm</a>
                        </div>
                    </div>
                </div>
            `;
        }

        // Cập nhật số lượng
        function updateQuantity(index, change) {
            cart[index].quantity += change;
            if (cart[index].quantity < 1) {
                cart[index].quantity = 1;
            }
            renderCart();
        }

        // Xóa sản phẩm
        function removeItem(index) {
            if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
                cart.splice(index, 1);
                renderCart();
            }
        }

        // Áp dụng mã giảm giá
        function applyCoupon() {
            const couponCode = document.getElementById('couponInput').value;
            if (couponCode.trim() === '') {
                alert('Vui lòng nhập mã giảm giá!');
                return;
            }
            // Logic xử lý mã giảm giá ở đây
            alert('Mã giảm giá: ' + couponCode + '\n(Chức năng đang được phát triển)');
        }

        // Thanh toán
        function checkout() {
            if (cart.length === 0) {
                alert('Giỏ hàng của bạn đang trống!');
                return;
            }
            alert('Chuyển đến trang thanh toán...\n(Chức năng đang được phát triển)');
            // window.location.href = 'thanhtoan.html';
        }

        // Load giỏ hàng khi trang được tải
        document.addEventListener('DOMContentLoaded', function() {
            renderCart();
        });
   