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

export async function addAvailableCourse(info) {
    try {
        const response = await fetch('http://localhost:6001/admin/addavailable', {
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

export async function addDepartment(info) {
    try {
      console.log(info);
        const response = await fetch('http://localhost:6001/admin/adddepartment', {
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

export async function getDeInFac(info) {
    try {
        const response = await fetch('http://localhost:6001/admin/getdeinfac', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ faculty_id: info }),
        });
        const data = await response.json();
        if (response.status === 404) {
          return Promise.reject(data);
      }
        return Promise.resolve(data);
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
}

export async function addStudent(info) {
  console.log(info.year);
    function generateStudentId(year, department_id, index) {
      // Format: yyCPE0001
      const yearString = year.toString().slice(-2);
      return `${yearString}${department_id}${index.toString().padStart(3, '0')}`;
    }

    const students = [];
    for (let i = 1; i <= info.number; i++) {
        const studentId = generateStudentId(info.year, info.department_id, i);
        students.push({ student_id: studentId, password: studentId, year: info.year,
                        department_id: info.department_id, teacher_id: info.teacher_id });
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

export async function addTeacher(info) {
  try {
      console.log(info);
      const response = await fetch('http://localhost:6001/admin/addteacher', {
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

export async function getDeTeacher(info) {
  try {
      const response = await fetch('http://localhost:6001/admin/getdeteacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ department_id: info }),
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



