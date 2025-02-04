// State management
let currentOrder = {
    items: [],
    type: 'dine-in'
};

// Load state dari localStorage jika ada
const loadState = () => {
    const savedState = localStorage.getItem('currentOrder');
    if (savedState) {
        currentOrder = JSON.parse(savedState);
        renderOrderItems();
        updateTotals();
    }
};

// Simpan state ke localStorage
const saveState = () => {
    localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
};

// Render kategori menu
const renderCategories = () => {
    const categoryBar = document.querySelector('.category-bar .d-flex');
    categoryBar.innerHTML = categories.map(category => `
        <button class="btn btn-outline-secondary" data-category="${category.id}">
            <i class="fas ${category.icon}"></i>
            ${category.name}
        </button>
    `).join('');

    // Event listener untuk filter menu
    categoryBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn');
        if (btn) {
            const categoryId = btn.dataset.category;
            renderMenuItems(categoryId);
            
            // Update active state
            categoryBar.querySelectorAll('.btn').forEach(button => 
                button.classList.toggle('active', button === btn));
        }
    });

    // Set kategori pertama sebagai active
    categoryBar.querySelector('.btn').click();
};

// Render menu items
const renderMenuItems = (categoryId = null) => {
    const menuGrid = document.getElementById('menuGrid');
    const filteredItems = categoryId 
        ? menuItems.filter(item => item.category === categoryId)
        : menuItems;

    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card menu-item h-100">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Rp ${item.price.toLocaleString('id-ID')}</p>
                    <button class="btn btn-primary w-100" onclick="addToOrder(${item.id})">
                        <i class="fas fa-plus"></i> Tambah
                    </button>
                </div>
            </div>
        </div>
    `).join('');
};

// Tambah item ke order
const addToOrder = (itemId) => {
    const item = menuItems.find(item => item.id === itemId);
    const existingItem = currentOrder.items.find(orderItem => orderItem.id === itemId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        currentOrder.items.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            notes: ''
        });
    }

    renderOrderItems();
    updateTotals();
    saveState();
};

// Update quantity item
const updateQuantity = (itemId, delta) => {
    const item = currentOrder.items.find(item => item.id === itemId);
    if (item) {
        item.quantity = Math.max(0, item.quantity + delta);
        if (item.quantity === 0) {
            currentOrder.items = currentOrder.items.filter(item => item.id !== itemId);
        }
        renderOrderItems();
        updateTotals();
        saveState();
    }
};

// Tambah catatan ke item
const addNote = (itemId) => {
    const item = currentOrder.items.find(item => item.id === itemId);
    if (item) {
        const note = prompt('Tambah catatan:', item.notes);
        if (note !== null) {
            item.notes = note;
            renderOrderItems();
            saveState();
        }
    }
};

// Render order items
const renderOrderItems = () => {
    const orderList = document.getElementById('orderList');
    
    if (currentOrder.items.length === 0) {
        orderList.innerHTML = `
            <div class="text-center text-muted p-4">
                <i class="fas fa-shopping-cart fa-2x mb-2"></i>
                <p>Belum ada item</p>
            </div>
        `;
        return;
    }

    orderList.innerHTML = currentOrder.items.map(item => `
        <div class="list-group-item">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0">${item.name}</h6>
                <div class="quantity-control d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="text" value="${item.quantity}" readonly>
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">
                    Rp ${item.price.toLocaleString('id-ID')} × ${item.quantity} = 
                    Rp ${(item.price * item.quantity).toLocaleString('id-ID')}
                </small>
                <button class="btn btn-sm btn-outline-secondary" onclick="addNote(${item.id})">
                    <i class="fas fa-comment-alt"></i>
                </button>
            </div>
            ${item.notes ? `
                <small class="d-block mt-1 text-info">
                    <i class="fas fa-info-circle"></i> ${item.notes}
                </small>
            ` : ''}
        </div>
    `).join('');
};

// Update totals
const updateTotals = () => {
    const subtotal = currentOrder.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.11; // PPN 11%
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = 
        `Rp ${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('tax').textContent = 
        `Rp ${tax.toLocaleString('id-ID')}`;
    document.getElementById('total').textContent = 
        `Rp ${total.toLocaleString('id-ID')}`;
};

// Event listener untuk tipe order
document.getElementById('orderType').addEventListener('change', (e) => {
    currentOrder.type = e.target.value;
    saveState();
});

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    loadState();
    
    // Set order number
    const orderNumber = Math.floor(Math.random() * 900) + 100;
    document.getElementById('orderNumber').textContent = 
        orderNumber.toString().padStart(3, '0');

    // Mobile responsive handlers
    const toggleSidebar = () => {
        document.getElementById('sidebar').classList.toggle('show');
    };

    const toggleOrderPanel = () => {
        document.querySelector('.col-order').classList.toggle('show');
    };

    // Tambahkan toggle button untuk mobile jika belum ada
    if (!document.getElementById('sidebarToggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'sidebarToggle';
        toggleBtn.className = 'btn btn-primary position-fixed d-lg-none';
        toggleBtn.style.cssText = 'top: 10px; left: 10px; z-index: 1001;';
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        toggleBtn.onclick = toggleSidebar;
        document.body.appendChild(toggleBtn);
    }

    if (!document.getElementById('orderPanelToggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'orderPanelToggle';
        toggleBtn.className = 'btn btn-primary position-fixed d-md-none';
        toggleBtn.style.cssText = 'bottom: 10px; right: 10px; z-index: 1001;';
        toggleBtn.innerHTML = '<i class="fas fa-shopping-cart"></i>';
        toggleBtn.onclick = toggleOrderPanel;
        document.body.appendChild(toggleBtn);
    }
});
