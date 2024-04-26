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

export async function addFaculty(info) {
    try {
        const response = await fetch('http://localhost:6001/admin/addfaculty', {
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

export async function addStudent(info) {
    function generateStudentId(year, department, index) {
      // Format: yyCPE0001
      return `${year.slice(2)}${department}${index.toString().padStart(3, '0')}`;
    }

    const students = [];
    for (let i = 1; i <= info.number; i++) {
        const studentId = generateStudentId(info.year, info.department, i);
        students.push({ student_id: studentId, password: studentId });
    }

    try {
        const response = await fetch('http://localhost:6001/admin/addstudent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(students),
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



