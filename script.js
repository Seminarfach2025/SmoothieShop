// ==============================================================================
// 1. GENERELLE DATEN
// ==============================================================================

// Daten der Smoothies
const SMOOTHIE_DATA = [
    { id: 1, name: 'Tropical Dream', content: 'Mango, Ananas, Orange, Kokoswasser', ingredients: 'Laktosefrei, vegan', price: 5.20 },
    { id: 2, name: 'Berrylicious', content: 'Erdbeere, Heidelbeere, Himbeere, Apfelsaft', ingredients: 'Laktosefrei, vegan', price: 5.50 },
    { id: 3, name: 'Banana Boost', content: 'Banane, Hafermilch, Honig, Vanille', ingredients: 'Enthält Gluten (Hafer), vegetarisch', price: 5.00 },
    { id: 4, name: 'Peach Paradise', content: 'Pfirsich, Maracuja, Joghurt, Eiswürfel', ingredients: 'Enthält Laktose', price: 5.40 },
    { id: 5, name: 'Green Energy', content: 'Apfel, Spinat, Gurke, Ingwer, Zitrone', ingredients: 'Laktosefrei, vegan', price: 5.80 },
    { id: 6, name: 'Sunshine Glow', content: 'Ananas, Mango, Karotte, Limette', ingredients: 'Laktosefrei, vegan', price: 5.60 },
    { id: 7, name: 'Cherry Bomb', content: 'Kirsche, Banane, Vanillejoghurt', ingredients: 'Enthält Laktose', price: 5.30 },
    { id: 8, name: 'Purple Power', content: 'Blaubeere, Traube, Banane, Sojamilch', ingredients: 'Enthält Soja, vegan', price: 5.70 },
    { id: 9, name: 'Morning Sunshine', content: 'Orange, Banane, Karotte, Kurkuma', ingredients: 'Laktosefrei, vegan', price: 5.40 },
    { id: 10, name: 'Apple Bliss', content: 'Apfel, Birne, Zimt, Hafermilch', ingredients: 'Enthält Gluten (Hafer), vegan', price: 5.20 },
    { id: 11, name: 'Blue Lagoon', content: 'Blaubeere, Kokosmilch, Vanille', ingredients: 'Vegan', price: 5.80 },
    { id: 12, name: 'Strawberry Kiss', content: 'Erdbeere, Joghurt, Honig', ingredients: 'Enthält Laktose, vegetarisch', price: 5.00 },
    { id: 13, name: 'Kiwi Fresh', content: 'Kiwi, Apfel, Gurke, Limette', ingredients: 'Laktosefrei, vegan', price: 5.40 },
    { id: 14, name: 'Choco Banana Bliss', content: 'Banane, Kakaopulver, Mandelmilch, Dattel', ingredients: 'Enthält Nüsse (Mandeln), vegan', price: 5.90 },
    { id: 15, name: 'Lemon Detox', content: 'Zitrone, Apfel, Sellerie, Minze', ingredients: 'Laktosefrei, vegan', price: 5.60 },
    { id: 16, name: 'Melon Magic', content: 'Wassermelone, Minze, Limette', ingredients: 'Laktosefrei, vegan', price: 5.20 },
    { id: 17, name: 'Sweet Harmony', content: 'Birne, Banane, Spinat, Hafermilch', ingredients: 'Enthält Gluten (Hafer), vegan', price: 5.50 },
    { id: 18, name: 'Coconut Dream', content: 'Kokosmilch, Ananas, Banane, Vanille', ingredients: 'Vegan', price: 5.80 },
    { id: 19, name: 'Mango Tango', content: 'Mango, Banane, Joghurt', ingredients: 'Enthält Laktose', price: 5.30 },
    { id: 20, name: 'Grape Escape', content: 'Traube, Apfel, Zitrone, Minze', ingredients: 'Laktosefrei, vegan', price: 5.40 },
    { id: 21, name: 'Smooth Classic', content: 'Erdbeere, Banane, Apfelsaft', ingredients: 'Laktosefrei, vegan', price: 5.00 },
    { id: 22, name: 'Autumn Spice', content: 'Apfel, Karotte, Zimt, Mandelmilch', ingredients: 'Enthält Nüsse (Mandeln), vegan', price: 5.50 },
    { id: 23, name: 'Blueberry Cheesecake', content: 'Blaubeere, Frischkäse, Vanille, Milch', ingredients: 'Enthält Laktose', price: 5.90 },
    { id: 24, name: 'Piña Fit', content: 'Ananas, Kokoswasser, Proteinpulver (Soja)', ingredients: 'Enthält Soja, vegan', price: 6.20 },
    { id: 25, name: 'Red Velvet Smoothie', content: 'Kirsche, Rote Beete, Apfel, Vanille', ingredients: 'Laktosefrei, vegan', price: 5.60 }
];

// Zustandsvariablen
let customerName = { firstName: '', lastName: '' };
let shoppingCart = [];
let appliedDiscount = null;
let finalPrice = 0;
let outOfStockIds = []; // Enthält die IDs der zufällig ausverkauften Smoothies

// Admin/Statistik Variablen
let totalRevenue = 0;
// Speichert die Bestellungen zur Auswertung { smoothieId: Anzahl }
let orderStatistics = {}; 

// ==============================================================================
// 2. SETUP
// ==============================================================================

// Zeigt die ausgewählte Sektion an und verbirgt alle anderen
function showSection(sectionId) {
    // Alle Sektionen ausblenden
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active-section');
        section.classList.add('hidden-section');
    });

    // Gewünschte Sektion einblenden
    document.getElementById(sectionId).classList.remove('hidden-section');
    document.getElementById(sectionId).classList.add('active-section');
    
    // Spezielle Aktionen beim Wechsel der Sektion
    if (sectionId === 'menu-section') {
        renderMenu();
    } else if (sectionId === 'order-section') {
        // Bei 'Bestellen' immer bei Schritt 1 beginnen (Name)
        resetOrderProcess();
    } else if (sectionId === 'login-section') {
        // Beim Login zurücksetzen
        document.getElementById('login-form').classList.remove('hidden');
        document.getElementById('admin-dashboard').classList.add('hidden');
        document.getElementById('login-error-message').textContent = '';
    }
}

// Setzt den Bestellprozess auf den Anfang zurück
function resetOrderProcess() {
    // UI-Schritte zurücksetzen
    document.getElementById('order-step-1').classList.remove('hidden');
    document.getElementById('order-step-2').classList.add('hidden');
    document.getElementById('order-step-3').classList.add('hidden');
    document.getElementById('order-step-4').classList.add('hidden');
    document.getElementById('order-step-5').classList.add('hidden');

    // Daten zurücksetzen
    shoppingCart = [];
    appliedDiscount = null;
    finalPrice = 0;
    
    // Formulare leeren
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';

    // Neue ausverkaufte Smoothies generieren und Liste neu rendern
    generateOutOfStockItems();
    renderSmoothieSelection();
    updateTotalPrice();
    document.getElementById('order-continue-btn').disabled = true;
}

// Generiert zufällig 3 bis 6 Smoothies, die ausverkauft sind
function generateOutOfStockItems() {
    const allIds = SMOOTHIE_DATA.map(s => s.id);
    // Zufällige Anzahl zwischen 3 und 6
    const count = Math.floor(Math.random() * 4) + 3; 
    outOfStockIds = [];

    while (outOfStockIds.length < count) {
        const randomIndex = Math.floor(Math.random() * allIds.length);
        const randomId = allIds[randomIndex];
        // Füge nur hinzu, wenn es noch nicht enthalten ist
        if (!outOfStockIds.includes(randomId)) {
            outOfStockIds.push(randomId);
        }
    }
}

// Fügt das Menü in die Menü-Sektion ein
function renderMenu() {
    const menuDiv = document.getElementById('smoothie-menu-display');
    menuDiv.innerHTML = SMOOTHIE_DATA.map(smoothie => `
        <div class="menu-item">
            <p><strong>${smoothie.id}. ${smoothie.name}</strong> (${smoothie.price.toFixed(2)} €)</p>
            <p>Inhalt: <em>${smoothie.content}</em></p>
            <p>Inhaltsstoffe: <em>${smoothie.ingredients}</em></p>
        </div>
    `).join('');
}


// ==============================================================================================================================
// 3. BESTELLUNG SCHRITT 1 & 2: NAME UND AUSWAHL 
// ==============================================================================================================================

// Speichert den Namen und geht zu Schritt 2
function startSmoothieSelection() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();

    if (firstName.length === 0 || lastName.length === 0) {
        alert('Bitte geben Sie Ihren Vor- und Nachnamen ein.');
        return;
    }

    // Namen speichern
    customerName = { firstName, lastName };

    // UI-Schritt wechseln
    document.getElementById('order-step-1').classList.add('hidden');
    document.getElementById('order-step-2').classList.remove('hidden');
}

// Rendert die Smoothie-Auswahl für die Bestellung
function renderSmoothieSelection() {
    const smoothieListDiv = document.getElementById('smoothie-list');
    smoothieListDiv.innerHTML = '';

    SMOOTHIE_DATA.forEach(smoothie => {
        const isOutOfStock = outOfStockIds.includes(smoothie.id);
        
        const itemDiv = document.createElement('div');
        itemDiv.className = `smoothie-item ${isOutOfStock ? 'out-of-stock' : ''}`;
        
        const statusText = isOutOfStock ? '<strong style="color: red;">(AUSVERKAUFT)</strong>' : '';

        itemDiv.innerHTML = `
            <div class="smoothie-info">
                <p><strong>${smoothie.name}</strong> ${statusText} - ${smoothie.price.toFixed(2)} €</p>
                <small>${smoothie.content}</small>
            </div>
            <div class="smoothie-controls">
                <label for="qty-${smoothie.id}">Menge:</label>
                <input type="number" id="qty-${smoothie.id}" value="0" min="0" onchange="updateCart(${smoothie.id}, this.value)" style="width: 50px;">
            </div>
        `;
        
        smoothieListDiv.appendChild(itemDiv);
    });
}

// Aktualisiert den Warenkorb basierend auf der Menge im Input-Feld
function updateCart(smoothieId, quantity) {
    const qty = parseInt(quantity);
    const smoothie = SMOOTHIE_DATA.find(s => s.id === smoothieId);

    // Prüfen, ob der Smoothie ausverkauft ist
    if (outOfStockIds.includes(smoothieId)) {
        document.getElementById(`qty-${smoothieId}`).value = 0;
        alert(`${smoothie.name} ist leider ausverkauft und kann nicht bestellt werden.`);
        return;
    }
    
    // Menge im Input-Feld korrigieren
    if (qty < 0 || isNaN(qty)) {
        document.getElementById(`qty-${smoothieId}`).value = 0;
        return;
    }

    // Warenkorb aktualisieren
    const cartIndex = shoppingCart.findIndex(item => item.id === smoothieId);

    if (qty > 0) {
        if (cartIndex > -1) {
            shoppingCart[cartIndex].quantity = qty;
        } else {
            shoppingCart.push({ id: smoothieId, name: smoothie.name, price: smoothie.price, quantity: qty });
        }
    } else {
        if (cartIndex > -1) {
            shoppingCart.splice(cartIndex, 1);
        }
    }

    updateTotalPrice();
}

// Berechnet den Gesamtpreis und aktualisiert die Anzeige
function updateTotalPrice() {
    let subtotal = shoppingCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('total-price').textContent = subtotal.toFixed(2);
    
    // Button "Weiter zur Kasse" aktivieren/deaktivieren
    const continueBtn = document.getElementById('order-continue-btn');
    continueBtn.disabled = shoppingCart.length === 0;

    return subtotal;
}

// ==============================================================================
// 4. BESTELLUNG SCHRITT 3: RABATT 
// ==============================================================================

function goToDiscountStep() {
    // UI-Schritt wechseln
    document.getElementById('order-step-2').classList.add('hidden');
    document.getElementById('order-step-3').classList.remove('hidden');

    // Preis aktualisieren (Subtotal)
    finalPrice = updateTotalPrice();
    document.getElementById('final-price').textContent = finalPrice.toFixed(2);
    
    // Rabattbereich zurücksetzen
    document.getElementById('discount-area').innerHTML = `
        <p>Laden Sie Ihren Rabatt, indem Sie auf den Button klicken:</p>
        <button onclick="applyDiscount()">Rabatt aufdecken!</button>
        <p id="discount-display" style="font-size: 1.2em; margin-top: 15px; font-weight: bold;"></p>
    `;
}

// Wählt zufällig einen Rabatt aus und wendet ihn an
function applyDiscount() {
    // Rabattlogik: 10% Preisnachlass, 20% Preisnachlass, Kaufe 2 bekomme 1 gratis, 2.50 € Rabatt, 3.50 € Rabatt, 4 € Rabatt, 5 € Rabatt
    const discounts = [
        { type: 'percent', value: 0.10, text: '🎉 10% Preisnachlass auf den gesamten Einkauf!' },
        { type: 'percent', value: 0.20, text: '🎉 20% Preisnachlass auf den gesamten Einkauf!' },
        { type: 'buyXgetY', value: 3, text: '🎁 Kaufe 2, bekomme 1 gratis! Das günstigste Getränk ist umsonst!' },
        { type: 'fixed', value: 2.50, text: '💰 2.50 € Rabatt auf den Gesamtpreis!' },
        {type: 'fixed', value: 3.50, text: '💰 3.50 € Rabatt auf den Gesamtpreis!' },
        { type: 'fixed', value: 4, text: '💰 4 € Rabatt auf den Gesamtpreis!' },
        { type: 'fixed', value: 5, text: '💰 5 € Rabatt auf den Gesamtpreis!' }
    ];

    // Zufällige Auswahl
    appliedDiscount = discounts[Math.floor(Math.random() * discounts.length)];
    let discountAmount = 0;
    let newFinalPrice = updateTotalPrice();
    
    // Rabatt berechnen
    switch (appliedDiscount.type) {
        case 'percent':
            discountAmount = newFinalPrice * appliedDiscount.value;
            newFinalPrice -= discountAmount;
            break;
            
        case 'buyXgetY':
            // Nur anwenden, wenn mindestens 3 Artikel im Warenkorb sind
            const totalItems = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
            if (totalItems >= 3) {
                // Finde den günstigsten Einzelartikelpreis, ignoriere Mengen
                let allPrices = [];
                shoppingCart.forEach(item => {
                    for(let i = 0; i < item.quantity; i++) {
                        allPrices.push(item.price);
                    }
                });
                
                // Sortiere Preise aufsteigend
                allPrices.sort((a, b) => a - b);
                
                // Der günstigste Preis ist der Rabatt
                discountAmount = allPrices.length > 0 ? allPrices[0] : 0;
                newFinalPrice -= discountAmount;

                appliedDiscount.text += ` (Sie sparen ${discountAmount.toFixed(2)} €)`;
            } else {
                appliedDiscount.text = `Schade! Bei mindestens 3 Artikeln hätten Sie den Rabatt "${appliedDiscount.text.substring(2, appliedDiscount.text.indexOf('!'))}" erhalten. Sie erhalten stattdessen 5% Rabatt.`;
                discountAmount = newFinalPrice * 0.05;
                newFinalPrice -= discountAmount;
            }
            break;
            
        case 'fixed':
            discountAmount = appliedDiscount.value;
            newFinalPrice -= discountAmount;
            break;
    }

    // Finalen Preis setzen
    finalPrice = Math.max(0, newFinalPrice); // Preis kann nicht negativ sein
    
    // UI aktualisieren
    document.getElementById('discount-display').textContent = appliedDiscount.text;
    document.getElementById('final-price').textContent = finalPrice.toFixed(2);
    
    // Rabatt-Button deaktivieren
    document.getElementById('discount-area').innerHTML += `<p style="margin-top: 10px;">Rabatt wurde angewendet!</p>`;
    document.getElementById('discount-area').querySelector('button').remove();
}

// ==============================================================================
// 5. BESTELLUNG SCHRITT 4: ZAHLUNG
// ==============================================================================

function goToPaymentStep() {
    // UI-Schritt wechseln
    document.getElementById('order-step-3').classList.add('hidden');
    document.getElementById('order-step-4').classList.remove('hidden');

    document.getElementById('payment-amount').textContent = finalPrice.toFixed(2);
    document.getElementById('payment-form-area').innerHTML = ''; // Formularbereich leeren
    document.getElementById('payment-status').textContent = ''; // Status leeren
}

// Zeigt das entsprechende Zahlungsformular an
function showPaymentForm(method) {
    const formArea = document.getElementById('payment-form-area');
    document.getElementById('payment-status').textContent = '';

    if (method === 'paypal') {
        formArea.innerHTML = `
            <div class="payment-form-field">
                <label for="paypalEmail">PayPal E-Mail:</label>
                <input type="email" id="paypalEmail" required>
            </div>
            <div class="payment-form-field">
                <label for="paypalPassword">Passwort:</label>
                <input type="password" id="paypalPassword" required>
            </div>
            <button onclick="processPayment('paypal')">Zahlung mit PayPal abschließen</button>
        `;
    } else if (method === 'cash') {
        // Barzahlung: Zufällige Nummer generieren (zwischen 1 und 1000)
        const cashNumber = Math.floor(Math.random() * 1000) + 1;
        formArea.innerHTML = `
            <p>Bitte geben Sie an der Kasse die folgende Nummer an, um ${finalPrice.toFixed(2)} € bar zu bezahlen:</p>
            <p style="font-size: 2em; font-weight: bold; color: #000000; background-color: #FFFFFF; padding: 10px; border-radius: 5px; text-align: center;">#${String(cashNumber).padStart(4, '0')}</p>
            <button onclick="processPayment('cash')">Bestellung abschließen (Barzahlung)</button>
        `;
    } else if (method === 'credit' || method === 'debit') {
        formArea.innerHTML = `
            <div class="payment-form-field">
                <label for="cardNumber">Kartennummer (16 Stellen):</label>
                <input type="text" id="cardNumber" maxlength="16" required>
            </div>
            <div class="payment-form-field">
                <label for="securityCode">Sicherheitsnummer (3 Stellen):</label>
                <input type="text" id="securityCode" maxlength="3" required>
            </div>
            <button onclick="processPayment('${method}')">Zahlung mit ${method === 'credit' ? 'Kreditkarte' : 'Debitkarte'} abschließen</button>
        `;
    }
}

// Verarbeitet die Zahlung und prüft die Eingaben (KORRIGIERTER ABSCHNITT)
function processPayment(method) {
    let isValid = true;
    const paymentStatusElement = document.getElementById('payment-status');
    paymentStatusElement.textContent = ''; // Status zurücksetzen
    
    // Barzahlung ist immer erfolgreich
    if (method === 'cash') {
        isValid = true;
    } 
    // PayPal und Kartenzahlungen benötigen eine Validierung
    else {
        
        if (method === 'paypal') {
            // Lesen der Werte aus den Formularfeldern
            const email = document.getElementById('paypalEmail').value.trim();
            const password = document.getElementById('paypalPassword').value.trim();
            
            // Prüfung: Muss mindestens 3 Zeichen lang sein (beliebige Prüfung)
            if (email.length < 3 || password.length < 3) {
                isValid = false;
                paymentStatusElement.textContent = 'Fehler: Bitte geben Sie gültige Anmeldedaten ein (mindestens 3 Zeichen).';
            }
        } 
        else if (method === 'credit' || method === 'debit') {
            // Lesen der Werte aus den Formularfeldern
            const cardNumber = document.getElementById('cardNumber').value.trim();
            const securityCode = document.getElementById('securityCode').value.trim();
            
            // Prüfung der Länge und des Formats
            
            // 1. Nur Zahlenprüfung
            if (!/^\d+$/.test(cardNumber) || !/^\d+$/.test(securityCode)) {
                 isValid = false;
                 paymentStatusElement.textContent = 'Fehler: Nur Zahlen sind erlaubt.';
            }

            // 2. Längenprüfung
            if (cardNumber.length !== 16) {
                isValid = false;
                if (!paymentStatusElement.textContent) { // Füge nur hinzu, wenn noch kein Fehler da ist
                    paymentStatusElement.textContent = 'Fehler: Die Kartennummer muss 16 Stellen lang sein.';
                }
            } 
            if (securityCode.length !== 3) {
                isValid = false;
                // Füge den Fehler hinzu, falls es nicht schon ein anderer Fehler ist
                if (paymentStatusElement.textContent && paymentStatusElement.textContent.indexOf('Kartennummer') === -1) {
                    paymentStatusElement.textContent += ' '; 
                } else if (!paymentStatusElement.textContent) {
                    paymentStatusElement.textContent = '';
                }
                paymentStatusElement.textContent += 'Fehler: Die Sicherheitsnummer muss 3 Stellen lang sein.';
            }
        }
    }


    if (isValid) {
        // Bei erfolgreicher Validierung oder Barzahlung
        completeOrder();
    } else {
        // Standard-Fehlermeldung, wenn keine spezifische ausgegeben wurde
        if (paymentStatusElement.textContent.indexOf('Fehler') === -1) {
            paymentStatusElement.textContent = 'Es tut uns Leid, aber ihre Zahlungsmethode wurde abgelehnt.';
        }
        paymentStatusElement.style.color = 'red';
    }
} // <<<--- KORREKTUR: HIER WURDE DIE FEHLENDE KLAMMER EINGEFÜGT

// ==============================================================================
// 6. BESTELLABSCHLUSS & ADMIN
// ==============================================================================

// Bestellabschluss: Umsatz und Statistik speichern
function completeOrder() {
    // 1. Umsatz aktualisieren
    totalRevenue += finalPrice;
    
    // 2. Statistik aktualisieren
    shoppingCart.forEach(item => {
        if (!orderStatistics[item.id]) {
            orderStatistics[item.id] = 0;
        }
        orderStatistics[item.id] += item.quantity;
    });

    // 3. UI auf Bestätigung wechseln
    document.getElementById('order-step-4').classList.add('hidden');
    document.getElementById('order-step-5').classList.remove('hidden');

    const confirmationMsg = document.getElementById('confirmation-message');
    let msg = `Vielen Dank für Ihre Bestellung, ${customerName.firstName}! Ihre Bestellung im Wert von ${finalPrice.toFixed(2)} € ist eingegangen.`;
    
    // NEU: Hinzufügen der Bestellzusammenfassung
    if (shoppingCart.length > 0) {
        msg += `<br><br><strong>Ihre bestellten Smoothies:</strong><ul style="list-style-type: none; padding-left: 0; margin-top: 5px;">`;
        
        shoppingCart.forEach(item => {
            msg += `<li>— ${item.quantity}x ${item.name} (${(item.price * item.quantity).toFixed(2)} €)</li>`;
        });
        
        msg += `</ul>`;
    }

    if (appliedDiscount) {
        // Entfernt HTML-Tags, falls im Discount-Text enthalten (wie <span> oder Icons)
        msg += `<br>Der angewendete Rabatt war: ${appliedDiscount.text.replace(/<.*?>/g, '')}`;
    }
    
    confirmationMsg.innerHTML = msg;
    
    // Warenkorb und Rabatt zurücksetzen
    shoppingCart = [];
    appliedDiscount = null;
}


function attemptLogin() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const errorMessage = document.getElementById('login-error-message');

    // Feste Anmeldedaten
    const correctUsername = 'Smoothie.Shop';
    const correctPassword = 'Informatik';

    if (usernameInput === correctUsername && passwordInput === correctPassword) {
        // Login erfolgreich
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('admin-dashboard').classList.remove('hidden');
        document.getElementById('logged-in-user').textContent = usernameInput;
        errorMessage.textContent = '';
        renderAdminDashboard();
    } else {
        // Login fehlgeschlagen
        errorMessage.textContent = 'Falscher Anmeldename oder falsches Passwort.';
    }
}

function logout() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('admin-dashboard').classList.add('hidden');
}

// Aktualisiert die Statistikanzeigen im Dashboard
function renderAdminDashboard() {
    // Umsatz anzeigen
    document.getElementById('total-revenue-display').textContent = `${totalRevenue.toFixed(2)} €`;

    // Statistik-Balkendiagramm erstellen
    const chartDiv = document.getElementById('order-statistics-chart');
    chartDiv.innerHTML = '';
    
    const orderedSmoothies = Object.keys(orderStatistics).filter(id => orderStatistics[id] > 0);

    if (orderedSmoothies.length === 0) {
        chartDiv.innerHTML = '<p>Noch keine Smoothies bestellt.</p>';
        return;
    }
    
    const maxOrders = Math.max(...Object.values(orderStatistics));

    orderedSmoothies.forEach(idStr => {
        const id = parseInt(idStr);
        const count = orderStatistics[id];
        const smoothie = SMOOTHIE_DATA.find(s => s.id === id);
        
        // Berechnung der Balkenbreite (prozentual zur maximalen Bestellmenge)
        const barWidth = (count / maxOrders) * 100;

        const barHtml = `
            <div style="margin-bottom: 5px;">
                <p style="margin: 0; font-size: 0.9em;">${smoothie.id}. ${smoothie.name} (${count}x)</p>
                <div class="chart-bar" style="width: ${barWidth}%;">
                    </div>
            </div>
        `;
        chartDiv.innerHTML += barHtml;
    });
}


// ==============================================================================
// 7. STARTER AUFRUF
// ==============================================================================

// Stellt sicher, dass das Menü beim Laden der Seite gestartet wird
document.addEventListener('DOMContentLoaded', () => {
    // Beim ersten Laden der Seite die ausverkauften Artikel festlegen
    generateOutOfStockItems();
    // Menü rendern, damit es bei Klick auf "Menü" direkt angezeigt wird
    renderMenu(); 
    // Sicherstellen, dass die Willkommenssektion aktiv ist (wird auch in showSection gemacht)
    showSection('welcome-section');
});
