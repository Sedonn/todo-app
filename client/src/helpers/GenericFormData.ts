class GenericFormData<T = object> extends FormData {
  constructor(
    form?: HTMLFormElement | undefined,
    submitter?: HTMLElement | null | undefined,
  ) {
    super(form, submitter);
  }

  /**
   * Get form data converted to {@link T} generic type.
   */
  toObject(): T {
    return Object.fromEntries(this.entries()) as T;
  }
}

export default GenericFormData;
