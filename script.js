document.addEventListener('DOMContentLoaded', () => {
    const erpForm = document.getElementById('erpForm');
    const paymentType = document.getElementById('paymentType');
    const partyStep = document.getElementById('step-party');
    const partyName = document.getElementById('partyName');
    const docStep = document.getElementById('step-doc-number');
    const docNumber = document.getElementById('docNumber');
    
    // Conditional Sections
    const dealFields = document.getElementById('dealFields');
    const salesFields = document.getElementById('salesFields');
    const expenseFields = document.getElementById('expenseFields');
    const submitContainer = document.getElementById('submitContainer');
    const toast = document.getElementById('toast');

    // Mock Data for "Auto-fetch"
    const mockParties = {
        DEAL: ["Global Traders Inc.", "Summit Logistics", "Nexus Energy"],
        SALES: ["Retail Corp", "Direct Consumer Group", "Wholesale Hub"],
        EXPENSE: ["Office Supplies Co", "Tech Maintenance Ltd", "Travel Agency X"]
    };

    const mockDetails = {
        DEAL: {
            details: "Standard deal for industrial equipment acquisition. Milestone 1.",
            purchasing: "Your Company Ltd.",
            currency: "USD",
            amount: "45,000.00",
            companies: ["Industrial Partners", "Equipment Corp"]
        },
        SALES: {
            commodity: "Copper Cathodes",
            party: "Retail Corp",
            qty: "500 MT",
            rate: "$8,500/MT",
            total: "$4,250,000.00",
            currency: "USD",
            term: "Net 30",
            advance: "$850,000.00",
            percent: "20%"
        },
        EXPENSE: {
            party: "Office Supplies Co",
            item: "Workstation Upgrade Bundle",
            value: "12,400.00",
            currency: "EUR"
        }
    };

    // --- Logic Functions ---

    // 1. Payment Type Selection
    paymentType.addEventListener('change', (e) => {
        const type = e.target.value;
        resetFormFromStep(1);
        
        // Show party selection immediately
        partyStep.classList.remove('hidden');
        
        partyName.innerHTML = '<option value="" disabled selected>Select Party</option>';
        mockParties[type].forEach(party => {
            const opt = document.createElement('option');
            opt.value = party;
            opt.textContent = party;
            partyName.appendChild(opt);
        });

        partyName.disabled = false;
    });

    // 2. Party Selection
    partyName.addEventListener('change', () => {
        docStep.classList.remove('hidden');
        docNumber.focus();
    });

    // 3. Document Number Enter
    docNumber.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = docNumber.value.trim();
            if (!val) return;

            // Immediately populate fields based on Payment Type
            const type = paymentType.value;
            populateConditionalFields(type);
            
            submitContainer.classList.remove('hidden');
        }
    });

    function populateConditionalFields(type) {
        hideAllConditional();
        const data = mockDetails[type];

        if (type === 'DEAL') {
            dealFields.classList.remove('hidden');
            document.getElementById('dealDetails').value = data.details;
            document.getElementById('purchasingCompany').value = data.purchasing;
            document.getElementById('dealCurrency').value = data.currency;
            document.getElementById('dealAmount').value = data.amount;
            
            const payingComp = document.getElementById('payingCompany');
            payingComp.innerHTML = '';
            data.companies.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c;
                opt.textContent = c;
                payingComp.appendChild(opt);
            });
        } 
        else if (type === 'SALES') {
            salesFields.classList.remove('hidden');
            document.getElementById('salesCommodity').value = data.commodity;
            document.getElementById('salesParty').value = data.party;
            document.getElementById('salesQty').value = data.qty;
            document.getElementById('salesRate').value = data.rate;
            document.getElementById('salesTotal').value = data.total;
            document.getElementById('salesCurrency').value = data.currency;
            document.getElementById('salesTerm').value = data.term;
            document.getElementById('salesAdvance').value = data.advance;
            document.getElementById('salesPercent').value = data.percent;
        }
        else if (type === 'EXPENSE') {
            expenseFields.classList.remove('hidden');
            document.getElementById('expenseParty').value = data.party;
            document.getElementById('expenseItem').value = data.item;
            document.getElementById('expenseValue').value = data.value;
            document.getElementById('expenseCurrency').value = data.currency;
        }
    }

    function hideAllConditional() {
        dealFields.classList.add('hidden');
        salesFields.classList.add('hidden');
        expenseFields.classList.add('hidden');
    }

    function resetFormFromStep(step) {
        if (step <= 1) {
            partyStep.classList.add('hidden');
            partyName.innerHTML = '';
        }
        if (step <= 2) {
            docStep.classList.add('hidden');
            docNumber.value = '';
        }
        hideAllConditional();
        submitContainer.classList.add('hidden');
    }

    // Form Submission
    erpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success animation/toast
        toast.textContent = "Payment Processed Successfully!";
        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
            location.reload(); // Reset for demo
        }, 3000);
    });
});
