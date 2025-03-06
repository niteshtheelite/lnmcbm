#include <stdio.h>
#include <stdlib.h>

struct Node
{
    int data;
    struct Node *next;
};

void inerstAtStart(struct Node **head, int value)
{
    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));
    newNode->data = value;
    newNode->next = *head;
    *head = newNode;
}

void printList(struct Node *head)
{
    struct Node *temp = head;
    printf("Linked List: ");
    while (temp != NULL)
    {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");
}

int main()
{
    struct Node *head = NULL;
    int n, value;

    printf("Enter the number of node you  want to create: ");
    scanf("%d", &n);

    for (int i = 0; i < n; i++)
    {
        printf("Enter the value of Node %d: ", i + 1);
        scanf("%d", &value);
        inerstAtStart(&head, value);
    }
    printList(head);
    return 0;
}
