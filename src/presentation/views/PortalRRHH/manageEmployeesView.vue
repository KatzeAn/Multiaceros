<template>
  <div class="space-y-6">
    <!-- Sección de Tarjetas -->
    <h2 class="text-xl font-bold">Empleados</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <EmployeeCard
        v-for="employee in employees"
        :key="employee.id"
        :fullName="employee.fullName"
        :position="employee.position"
        :hireDate="employee.hireDate"
        :status="employee.status"
        :avatar="employee.avatar"
        :shape="employee.shape" 
        :size="employee.size" 
      />
    </div>
  </div>
</template>

<script>
import EmployeeCard from "./components/EmployeeCard.vue";

export default {
  components: { EmployeeCard },
  data() {
    return {
      employees: [
        {
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
    };
  },
};
</script>


