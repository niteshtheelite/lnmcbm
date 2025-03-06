#include <stdio.h>
#include <stdlib.h>

struct Node
{
    int data;
    struct Node *next;
};

void insertionAtPostion(struct Node **head, int value, int postion)
{
    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));
    newNode->data = value;

    if (postion == 1)
    {
        newNode->next = *head;
        *head = newNode;
        return;
    }

    struct Node *temp = *head;
    for (int i = 1; temp != NULL && i < postion - 1; i++)
    {
        temp = temp->next;
    }

    newNode->next = temp->next;
    temp->next = newNode;
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
    int n, value, postion;

    printf("Enter the number of node you  want to create: ");
    scanf("%d", &n);

    for (int i = 0; i < n; i++)
    {
        printf("Enter the value of Node %d: ", i + 1);
        scanf("%d", &value);
        printf("Enter the postion : ");
        scanf("%d", &postion);
        insertionAtPostion(&head, value, postion);
    }
    printList(head);
    return 0;
}
