| table_name          | column_name             | data_type                   | is_nullable |
| ------------------- | ----------------------- | --------------------------- | ----------- |
| admin_activities    | id                      | uuid                        | NO          |
| admin_activities    | admin_id                | uuid                        | YES         |
| admin_activities    | action                  | USER-DEFINED                | NO          |
| admin_activities    | target_table            | text                        | NO          |
| admin_activities    | target_id               | uuid                        | YES         |
| admin_activities    | details                 | text                        | YES         |
| admin_activities    | created_at              | timestamp with time zone    | YES         |
| chat_rooms          | id                      | uuid                        | NO          |
| chat_rooms          | request_id              | uuid                        | YES         |
| chat_rooms          | is_active               | boolean                     | YES         |
| chat_rooms          | created_at              | timestamp with time zone    | YES         |
| chat_rooms          | updated_at              | timestamp with time zone    | YES         |
| contact_messages    | id                      | uuid                        | NO          |
| contact_messages    | name                    | text                        | NO          |
| contact_messages    | email                   | text                        | NO          |
| contact_messages    | phone                   | text                        | YES         |
| contact_messages    | subject                 | text                        | YES         |
| contact_messages    | message                 | text                        | NO          |
| contact_messages    | status                  | USER-DEFINED                | YES         |
| contact_messages    | created_at              | timestamp with time zone    | YES         |
| likes               | user_id                 | uuid                        | NO          |
| likes               | project_id              | uuid                        | NO          |
| likes               | created_at              | timestamp with time zone    | YES         |
| messages            | id                      | uuid                        | NO          |
| messages            | request_id              | uuid                        | NO          |
| messages            | sender_id               | uuid                        | NO          |
| messages            | topic                   | text                        | NO          |
| messages            | extension               | text                        | NO          |
| messages            | content                 | text                        | NO          |
| messages            | created_at              | timestamp with time zone    | YES         |
| messages            | payload                 | jsonb                       | YES         |
| messages            | event                   | text                        | YES         |
| messages            | attachments             | jsonb                       | YES         |
| messages            | chat_room_id            | uuid                        | YES         |
| messages            | private                 | boolean                     | YES         |
| messages            | updated_at              | timestamp without time zone | NO          |
| messages            | message_type            | USER-DEFINED                | YES         |
| messages            | inserted_at             | timestamp without time zone | NO          |
| messages            | media_url               | text                        | YES         |
| messages            | duration_seconds        | integer                     | YES         |
| messages            | id                      | uuid                        | NO          |
| portfolio_items     | id                      | uuid                        | NO          |
| portfolio_items     | title                   | text                        | NO          |
| portfolio_items     | description             | text                        | YES         |
| portfolio_items     | media_url               | text                        | NO          |
| portfolio_items     | media_type              | text                        | YES         |
| portfolio_items     | is_public_guest         | boolean                     | YES         |
| portfolio_items     | created_at              | timestamp with time zone    | YES         |
| profiles            | id                      | uuid                        | NO          |
| profiles            | role                    | USER-DEFINED                | YES         |
| profiles            | full_name               | text                        | YES         |
| profiles            | created_at              | timestamp with time zone    | YES         |
| profiles            | phone                   | text                        | YES         |
| project_images      | id                      | uuid                        | NO          |
| project_images      | project_id              | uuid                        | YES         |
| project_images      | image_url               | text                        | NO          |
| project_images      | is_cover                | boolean                     | YES         |
| project_images      | sort_order              | integer                     | YES         |
| project_images      | uploaded_at             | timestamp with time zone    | YES         |
| projects            | id                      | uuid                        | NO          |
| projects            | title                   | text                        | NO          |
| projects            | description             | text                        | YES         |
| projects            | service_type            | USER-DEFINED                | YES         |
| projects            | space_type              | USER-DEFINED                | YES         |
| projects            | area_sqm                | numeric                     | YES         |
| projects            | location                | text                        | YES         |
| projects            | main_image_url          | text                        | YES         |
| projects            | visibility              | USER-DEFINED                | YES         |
| projects            | construction_start_date | date                        | YES         |
| projects            | construction_end_date   | date                        | YES         |
| projects            | created_at              | timestamp with time zone    | YES         |
| projects            | updated_at              | timestamp with time zone    | YES         |
| request_attachments | id                      | uuid                        | NO          |
| request_attachments | request_id              | uuid                        | YES         |
| request_attachments | file_url                | text                        | NO          |
| request_attachments | file_name               | text                        | NO          |
| request_attachments | file_type               | USER-DEFINED                | NO          |
| request_attachments | uploaded_at             | timestamp with time zone    | YES         |
| service_requests    | id                      | uuid                        | NO          |
| service_requests    | user_id                 | uuid                        | NO          |
| service_requests    | service_type            | text                        | NO          |
| service_requests    | description             | text                        | YES         |
| service_requests    | status                  | USER-DEFINED                | YES         |
| service_requests    | created_at              | timestamp with time zone    | YES         |
| service_requests    | updated_at              | timestamp with time zone    | YES         |
| service_requests    | duration                | integer                     | YES         |
| service_requests    | area_sqm                | numeric                     | YES         |
| service_requests    | location                | text                        | YES         |
| service_requests    | request_code            | text                        | YES         |
| service_requests    | space_type              | USER-DEFINED                | YES         |
| site_settings       | id                      | uuid                        | NO          |
| site_settings       | key                     | text                        | NO          |
| site_settings       | value                   | text                        | YES         |
| site_settings       | description             | text                        | YES         |
| site_settings       | updated_at              | timestamp with time zone    | YES         |
| testimonials        | id                      | uuid                        | NO          |
| testimonials        | user_id                 | uuid                        | YES         |
| testimonials        | project_id              | uuid                        | YES         |
| testimonials        | rating                  | integer                     | YES         |
| testimonials        | comment                 | text                        | YES         |
| testimonials        | is_approved             | boolean                     | YES         |
| testimonials        | created_at              | timestamp with time zone    | YES         |