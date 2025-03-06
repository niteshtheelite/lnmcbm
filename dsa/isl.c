#include <stdio.h>
#include <stdlib.h>

struct Node
{
    int data;
    struct Node *next;
};

int main()
{
    struct Node *head = NULL;
    struct Node *temp = NULL;
    int n, value, i;

    printf("Enter the number of nodes: ");
    scanf("%d", &n);

    for (i = 0; i < n; i++)
    {
        struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));
        printf("Enter value for node %d: ", i + 1);
        scanf("%d", &newNode->data);
        newNode->next = NULL;

        if (head == NULL)
        {
            head = newNode; // First node becomes head
        }
        else
        {
            temp->next = newNode; // Attach new node to last node
        }
        temp = newNode; // Move temp to last node
    }

    // Print the linked list
    printf("Linked List: ");
    temp = head;
    while (temp != NULL)
    {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");

    return 0;
}
