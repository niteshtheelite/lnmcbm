#include<stdio.h>
#include<stdlib.h>
#define MAX 10


struct queue{
	int items[MAX];
	int rear;
	int front;
};


struct queue* createQueue(){
	struct queue* q =(struct queue*) malloc(sizeof(struct queue));
	q->rear=-1;
	q->front=-1;
	return q;
}


int isFull(struct queue* q){
	return q->rear == MAX-1;
}

int isEmpty(struct queue* q){
	return q->front = -1 || q->front > q->front;
}

void enqueue(struct queue* q, int value){
	if(isEmpty(q)){
		printf("Queue is full! Can not enqueue %d\n",value);
		return;
	}
	if(q->front == -1){
		q->front=0;
	}
	q->rear++;
	q->items[q->rear]= value;
	printf("Enqueue: %d\n",value);
}


void displayQueue(struct queue* q){
	if(isEmpty(q)){
		printf("Queue is Empty \n");
		return;
	}
	printf("Queue Elements are: \n");
	for(int i=q->front; i <= q->rear; i++){
		printf("%d " , q->items[i]);
	}
	printf("\n");
}


void main(){
	struct queue* q = createQueue();
	int n, value;

	printf("Enter the number of queue you want ot create: ");
	scanf("%d",&n);

	for(int i=0;i<n;i++){
		printf("Enter the value of Queue: " );
		scanf("%d",&value);
		enqueue(q,value);
	}
	
	displayQueue(q);
}
