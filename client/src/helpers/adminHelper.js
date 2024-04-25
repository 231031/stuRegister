export async function addCourse(info) {
    try {
        const response = await fetch('http://localhost:6001/admin/addcourse', {
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

export async function editCourse(info) {
    try {
        const response = await fetch('http://localhost:6001/admin/editcourse', {
          method: 'PUT',
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

export async function addDetail(info) {
    try {
        const response = await fetch('http://localhost:6001/admin/adddetail', {
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



