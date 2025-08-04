  const input = document.getElementById('uniqueIdInput');
  const button = document.getElementById('verifyBtn');
  const result = document.getElementById('verificationResult');
  const loadingScreen = document.getElementById('loadingScreen');
  const successBlock = document.getElementById('verificationSuccess');

  // Auto-format input and enforce uppercase
  input.addEventListener('input', () => {
    let raw = input.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 16);
    let formatted = raw.match(/.{1,4}/g)?.join('-') ?? '';
    input.value = formatted;
    result.textContent = '';
    result.className = 'text-sm mt-3 text-gray-400';
    successBlock.classList.add('hidden');
  });
  
      // Verify button logic
  button.addEventListener('click', async () => {
    let rawId = input.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    if (rawId.length !== 16) {
      result.textContent = '❌ Please enter a valid 16-character ID.';
      result.className = 'text-red-500 mt-3';
      return;
    }

    try {
      // Show loading screen
      loadingScreen.classList.remove('hidden');
      result.textContent = '';
      successBlock.classList.add('hidden');

      // Fetch the ID list
      const res = await fetch('https://ftx.click/unique/id.txt');
      const text = await res.text();
      const lines = text.split(/\r?\n/).map(line => line.trim().toUpperCase());

      // Hide loading screen
      loadingScreen.classList.add('hidden');

      if (lines.includes(rawId)) {
        // Show success
        successBlock.classList.remove('hidden');
        result.textContent = '';
      } else {
        // Not found
        result.textContent = '❌ ID not found. Please double-check your entry.';
        result.className = 'text-red-500 mt-3';
      }
    } catch (e) {
      loadingScreen.classList.add('hidden');
      result.textContent = '⚠️ Unable to verify at the moment. Please try again later.';
      result.className = 'text-yellow-500 mt-3';
    }
  });
  
