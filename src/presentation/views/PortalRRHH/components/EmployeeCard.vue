<template>
  <div
    class="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-gray-50 hover:scale-105"
  >
    <!-- Avatar -->
    <el-avatar
      :shape="shape"
      :size="size"
      :src="avatar"
      class="flex-shrink-0"
    />
    <div>
      <h3 class="text-lg font-semibold">{{ fullName }}</h3>
      <p class="text-sm text-gray-500">{{ position }}</p>
      <p class="text-sm text-gray-500">Fecha de contratación: {{ hireDate }}</p>
      <p
        class="text-sm font-medium"
        :class="{
          'text-green-600': status === 'Activo',
          'text-yellow-500': status === 'En periodo de prueba',
          'text-red-500': status === 'Inactivo',
        }"
      >
        Estado: {{ status }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmployeeCard",
  props: {
    fullName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    hireDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    shape: {
      type: String,
      default: "circle", // Forma por defecto
      validator: (value) => ["circle", "square"].includes(value),
    },
    
  },
};
</script>



  