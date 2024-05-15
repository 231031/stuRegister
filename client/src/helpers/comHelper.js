export async function login(info) {
  try {
    const response = await fetch('http://localhost:6001/committee/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: info }),
    });
    const data = await response.json();
    if (response.status === 404) {
      return Promise.reject(data);
    }
    console.log(data);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getApplicant(info) {
  try {
    const response = await fetch('http://localhost:6001/committee/getapplicant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: info }),
    });
    const data = await response.json();
    if (response.status === 404) {
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

// calculate gpax from tb edu_term
export async function getInfoStudent(info) {
  try {
    const response = await fetch('http://localhost:6001/committee/getstudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: info }),
    });
    const data = await response.json();
    if (response.status === 404) {
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getScholarHis(info) {
  try {
    const response = await fetch('http://localhost:6001/committee/getscholarhis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: info }),
    });
    const data = await response.json();
    if (response.status === 404) {
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

// if approved be transaction (modify scholarship, scholarship_history)
export async function updateCheck(evaluate, id) {
  console.log(evaluate);
  console.log(id);
  try {
    const response = await fetch('http://localhost:6001/committee/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ evaluate: evaluate, id: id }),
    });
    const data = await response.json();
    if (response.status === 404) {
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}


// advanced analysis

export async function getAvgF() {
  try {
    const response = await fetch('http://localhost:6001/committee/getavgf');
    const data = await response.json();
    if (response.status === 404) {
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getAvgM() {
  try {
    const response = await fetch('http://localhost:6001/committee/getavgm');
    const data = await response.json();
    if (response.status === 404) {
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}