# Array

An **array** is a data structure that allows you to store a fixed-size sequence of elements of the same type. Arrays are used to store multiple values in a single variable, instead of declaring separate variables for each value.

## Characteristics of Arrays

- **Fixed Size**: The size of an array is defined at the time of declaration and cannot be changed during runtime.
- **Homogeneous Elements**: All elements in an array must be of the same data type (e.g., all integers, all floats, etc.).
- **Contiguous Memory Allocation**: Arrays are stored in contiguous memory locations, which allows for efficient access to elements using an index.
- **Zero-Based Indexing**: In most programming languages, including C, arrays are zero-indexed, meaning the first element is accessed with index `0`.

## Example in C

Here is a basic example of declaring and initializing an array in C:

```c
int arr[5]; // Declaration of an array of 5 integers
arr[0] = 10; // Assigning value to the first element
arr[1] = 20; // Assigning value to the second element
```

---

# Dynamic Array

A **dynamic array** is an array that can change in size during runtime. Unlike static arrays, which have a fixed size, dynamic arrays can grow or shrink as needed. This flexibility is particularly useful when the number of elements to be stored is not known at compile time.

## Characteristics of Dynamic Arrays

- **Resizable**: Dynamic arrays can be resized, allowing you to add or remove elements as needed.
- **Memory Management**: Dynamic arrays typically require manual memory management, which means you need to allocate and deallocate memory using functions like `malloc`, `calloc`, and `free` in C.
- **Contiguous Memory Allocation**: Like static arrays, dynamic arrays also store elements in contiguous memory locations.

---

## Example of Dynamic Array in C

The following example demonstrates how to create and use a dynamic array in C:

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int n; // Size of the array
    printf("Enter the number of elements: ");
    scanf("%d", &n);

    // Allocate memory for n integers
    int *arr = (int *)malloc(n * sizeof(int));

    // Check if memory allocation was successful
    if (arr == NULL) {
        printf("Memory allocation failed!\n");
        return 1; // Exit if allocation fails
    }

    // Initialize the dynamic array
    for (int i = 0; i < n; i++) {
        arr[i] = i + 1; // Assign values
    }

    // Print the dynamic array
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    // Free the allocated memory
    free(arr);

    return 0;
}
