<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-bold">Empleados</h2>
      <AddIcon @open-form="openForm" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <EmployeeCard
        v-for="employee in employees"
        :key="employee.id"
        :id="employee.id"
        :fullName="employee.fullName"
        :position="employee.position"
        :hireDate="employee.hireDate"
        :status="employee.status"
        :avatar="employee.avatar"
        :shape="employee.shape"
        :size="employee.size"
        @edit="handleEdit" 
      />
    </div>

    <el-dialog v-model="isAddModalOpen" title="Añadir Nuevo Empleado">
      <AddEmploye @close-form="closeForm" @add-employee="addEmployee" />
    </el-dialog>

    <el-dialog v-model="isEditModalOpen" title="Editar Empleado">
      <EditEmployeeForm
        v-if="selectedEmployee"
        :employee="selectedEmployee"
        @close="isEditModalOpen = false"
        @save="saveEmployee"
      />
    </el-dialog>
  </div>
</template>

<script>
import AddIcon from './components/AddIcon.vue';
import AddEmploye from './components/AddEmploye.vue';
import EmployeeCard from "./components/EmployeeCard.vue";
import EditEmployeeForm from "./components/EditEmployeeForm.vue";

export default {
  components: { 
    AddIcon,
    AddEmploye,
    EmployeeCard,
    EditEmployeeForm,
  },
  data() {
    return {
      employees: [  {
          id: 1,
          fullName: "Angela Salamanca",
          position: "Desarrollador",
          hireDate: "2022-06-15",
          status: "En periodo de prueba",
          avatar:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          shape: "square",
          size: 50,
        },
        {
          id: 2,
          fullName: "Eduardo Fuentes",
          position: "Desarrollador",
          hireDate: "2023-03-01",
          status: "Activo",
          avatar:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          shape: "square",
          size: 50,
        },
        {
          id: 3,
          fullName: "Oscar Fuentes",
          position: "Desarrollador",
          hireDate: "2020-01-20",
          status: "Activo",
          avatar:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          shape: "square",
          size: 50,
        },
        {
          id: 4,
          fullName: "Harol Guzman",
          position: "Desarrollador",
          hireDate: "2020-01-20",
          status: "Activo",
          avatar:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          shape: "square",
          size: 50,
        },
        {
          id: 5,
          fullName: "Alejandro Yara",
          position: "Desarrollador",
          hireDate: "2020-01-20",
          status: "En periodo de prueba",
          avatar:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          shape: "square",
          size: 50,
        },
        {
          id: 6,
          fullName: "Jhon Alfaro",
          position: "Desarrollador",
          hireDate: "2020-01-20",
          status: "Inactivo",
          avatar:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          shape: "square",
          size: 50,
        },
        ],
      isAddModalOpen: false,
      isEditModalOpen: false,
      selectedEmployee: null,
    };
  },
  methods: {
    // Abre el modal para agregar empleado
    openForm() {
      this.isAddModalOpen = true;
    },
    // Cierra el modal de agregar empleado
    closeForm() {
      this.isAddModalOpen = false;
    },
    // Lógica para agregar un nuevo empleado
    addEmployee(newEmployee) {
      this.employees.push(newEmployee);
      this.isAddModalOpen = false;  // Cerrar el modal
    },
    handleEdit(employeeId) {
      this.selectedEmployee = this.employees.find(emp => emp.id === employeeId);
      this.isEditModalOpen = true;
    },
    saveEmployee(updatedEmployee) {
      const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);
      if (index !== -1) {
        this.$set(this.employees, index, updatedEmployee);
      }
      this.isEditModalOpen = false;
    },
  },
};
</script>


