export async function getApplicant() {
    try {
        const response = await fetch('http://localhost:6001/committee/getapplicant');    
        const data = await response.json();
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

// calculate gpax from tb edu_term
export async function getInfoStudent() {
    try {
        const response = await fetch('http://localhost:6001/committee/getstudent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(info),
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

// if approved be transaction (modify scholarship, scholarship_history)
export async function updateCheck(info) {  
    try {
        const response = await fetch('http://localhost:6001/committee/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(info),
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