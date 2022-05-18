'use strict'

		const openModel = ()=> document.getElementById('model').classList.add('active')

		const closeModel = ()=> {
			clearFields()
			document.getElementById('model').classList.remove('active')
		}

		const getLocalStorage = ()=> JSON.parse(localStorage.getItem('db_student'))??[]
		const setLocalStorage = (db_student)=> localStorage.setItem('db_student', JSON.stringify(db_student))




		const readStudent = ()=> getLocalStorage()

		console.log("Student data: "+getLocalStorage());

		const createStudent = (student)=> {
			const db_student = getLocalStorage()
			db_student.push(student)
			setLocalStorage(db_student)
		} 

		const updateStudent = (index, student)=> {
			const db_student = readStudent()
			db_student[index] = student
			setLocalStorage(db_student)
		}


		const deleteStudent = (index)=> {
			const db_student = readStudent()
			db_student.splice(index, 1)
			setLocalStorage(db_student)
		}

		const isValidFields = ()=> {
		   return document.getElementById('form').reportValidity()
		}

		const clearFields = ()=> {
			const fields = document.querySelectorAll('.model-field')
			fields.forEach(field => field.value = "")
		} 

		const saveStudent = ()=>{
			if(isValidFields()){
				const student = {
					name: document.getElementById('name').value,
					email: document.getElementById('email').value,
					phone: document.getElementById('phone').value,
					panier: document.getElementById('panier').value,
					montant: document.getElementById('montant').value,
					mode_paiement: document.getElementById('mode_paiement').value,
					adresse: document.getElementById('adresse').value,
					date_paiement: document.getElementById('date_paiement').value,
				}
				//console.log('The Cadastral student: ' + student)
				const index = document.getElementById('name').dataset.index
				if(index == 'new'){
					createStudent(student)
					listStudent()
					closeModel()
				}else{
					updateStudent(index, student)
					listStudent()
					closeModel()
				}
			}
		}


		const createRow = (student, index)=> {
			const newRow = document.createElement('tr')
			newRow.innerHTML = `
				<td>${student.name}</td>
				<td>${student.email}</td>
				<td>${student.phone}</td>
				<td>${student.panier}</td>
				<td>${student.montant}</td>
				<td>${student.mode_paiement}</td>
				<td>${student.adresse}</td>
				<td>${student.date_paiement}</td>
				<td>
					<button type="button" class="button green" id="edit-${index}">Edit</button>
					<button type="button" class="button red" id="delete-${index}">Delete</button>
				</td>
			`
			document.querySelector('#tblStudent>tbody').appendChild(newRow)
		}

		const crearTable = ()=> {
			const rows = document.querySelectorAll('#tblStudent>tbody tr')
			rows.forEach(row => row.parentNode.removeChild(row))
		}

		const listStudent = ()=> {
			const students =  readStudent()
			// console.log(students)
			crearTable()
			students.forEach(createRow)
		}

		const fillFields = (student)=> {
			document.getElementById('name').value = student.name
			document.getElementById('email').value = student.email
			document.getElementById('phone').value = student.phone
			document.getElementById('panier').value = student.panier
			document.getElementById('montant').value = student.montant
			document.getElementById('mode_paiement').value = student.mode_paiement
			document.getElementById('adresse').value = student.adresse
			document.getElementById('date_paiement').value = student.date_paiement

			document.getElementById('name').dataset.index = student.index
		}

		const editStudent = (index)=>{
			const student = readStudent()[index]
			student.index = index
			fillFields(student)
			openModel()
		}

		const editDelete = (event)=>{
			if(event.target.type == 'button'){
				const [action, index] = event.target.id.split('-')
				if(action == 'edit'){
					editStudent(index)
				}else{
					const student = readStudent()[index]
					const response = confirm(`Are you sure to delete the student ${student.name}`)
					if(response){
						deleteStudent(index)
						listStudent()
					}
				}
			}
		}

		listStudent()

		document.getElementById('idStudent').addEventListener('click', openModel)
		document.getElementById('modelClose').addEventListener('click', closeModel)
		document.getElementById('save').addEventListener('click', saveStudent)
		document.querySelector('#tblStudent>tbody').addEventListener('click', editDelete)