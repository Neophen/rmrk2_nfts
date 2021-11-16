export const useVModel = (
  props: { modelValue?: unknown },
  emit: (event: 'update:modelValue', value: unknown) => void
) => {
  const value = ref(props.modelValue);

  watch(value, (val) => {
    emit('update:modelValue', val);
  });

  watch(
    () => props.modelValue,
    (val) => {
      value.value = val;
    }
  );

  return value;
};
