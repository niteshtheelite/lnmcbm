#include <stdio.h>
#include <stdlib.h>

// Define the structure of a Node
struct Node {
    int data;
    struct Node* next;
};

// Function to create a new node
struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

// Function to insert at a specific position
void insertAtPosition(struct Node** head, int data, int position) {
    struct Node* newNode = createNode(data);

    // If inserting at the beginning
    if (position == 1) {
        newNode->next = *head;
        *head = newNode;
        return;
    }

    struct Node* temp = *head;
    int i;
    
    // Traverse to the (position-1)th node
    for (i = 1; temp != NULL && i < position - 1; i++) {
        temp = temp->next;
    }

    // If position is invalid
    if (temp == NULL) {
        printf("Invalid position! Inserting at the end.\n");
        free(newNode);
        return;
    }

    // Insert the node
    newNode->next = temp->next;
    temp->next = newNode;
}

// Function to display the linked list
void display(struct Node* head) {
    printf("Linked List: ");
    while (head != NULL) {
        printf("%d -> ", head->data);
        head = head->next;
    }
    printf("NULL\n");
}

int main() {
    struct Node* head = NULL;
    int choice, data, position;

    while (1) {
        printf("\n1. Insert at Position\n2. Display\n3. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter the value to insert: ");
                scanf("%d", &data);
                printf("Enter the position: ");
                scanf("%d", &position);
                insertAtPosition(&head, data, position);
                break;
            case 2:
                display(head);
                break;
            case 3:
                exit(0);
                break;
            default:
                printf("Invalid choice! Try again.\n");
        }
    }

    return 0;
}

