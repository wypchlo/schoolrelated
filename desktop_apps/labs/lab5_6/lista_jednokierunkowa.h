typedef int data;

typedef struct node {
    data value;
    node* next;
} node;

node* list_create_empty();
node* list_create_from_array(data* array, int size);

node* list_remove(node* first_element, int index);
node* list_remove_last(node* first_element);
node* list_remove_first(node* first_element);

node* list_insert_after(node* first_element, data value, int index);
node* list_add_first(node* first_element, data value);
node* list_add_last(node* first_element, data value);

node* list_clear(node* first_element);

void list_print(node* first_element);
