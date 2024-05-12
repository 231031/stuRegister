export async function getAllCourse() {
    try {
        const response = await fetch('http://localhost:6001/courses');
        const data = await response.json();
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

export async function getAllScholarships() {
    try {
        const response = await fetch('http://localhost:6001/scholarships');
        const data = await response.json();
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

export async function getDetailCourse() {
    try {
        const response = await fetch('http://localhost:6001/coursesde');    
        const data = await response.json();
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

export async function getFaculty() {
    try {
        const response = await fetch('http://localhost:6001/faculty');    
        const data = await response.json();
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

export async function getDepartment() {
    try {
        const response = await fetch('http://localhost:6001/departments');    
        const data = await response.json();
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      }
}

export async function getFacDe() {
    try {
        const response = await fetch('http://localhost:6001/faculty');    
        const fac = await response.json();
        const de = await fetch('http://localhost:6001/departments');    
        const department = await de.json();
        return Promise.resolve({ department, fac });
      } catch (error) {
        return Promise.reject(error);
      }
}

export async function getTeacher() {
    try {
        const response = await fetch('http://localhost:6001/teachers');    
        const teachers = await response.json();
        return Promise.resolve(teachers);
      } catch (error) {
        return Promise.reject(error);
      }
}