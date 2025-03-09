#include <stdio.h>

int main()
{
    int arr[100], size, element, i;

    // Taking input for the array size
    printf("Enter the number of elements in the array: ");
    scanf("%d", &size);

    // Taking input for array elements
    printf("Enter %d elements: ", size);
    for (i = 0; i < size; i++)
    {
        scanf("%d", &arr[i]);
    }

    // Taking input for the element to be inserted at the beginning
    printf("Enter the element to insert at the beginning: ");
    scanf("%d", &element);

    // Shifting all elements to the right
    for (i = size; i > 0; i--)
    {
        arr[i] = arr[i - 1];
    }

    // Inserting the new element at index 0
    arr[0] = element;
    size++; // Increasing the size of the array

    // Displaying the updated array
    printf("Updated array: ");
    for (i = 0; i < size; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");

    return 0;
}
