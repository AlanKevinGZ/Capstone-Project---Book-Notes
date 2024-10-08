PGDMP                         |            LibraryManager    15.4    15.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24585    LibraryManager    DATABASE     �   CREATE DATABASE "LibraryManager" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Latin America.1252';
     DROP DATABASE "LibraryManager";
                postgres    false            �            1259    24587    books    TABLE     E  CREATE TABLE public.books (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    isbn character varying(25) NOT NULL,
    published_date date,
    cover_url character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.books;
       public         heap    postgres    false            �            1259    24586    books_id_seq    SEQUENCE     �   CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.books_id_seq;
       public          postgres    false    215                       0    0    books_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;
          public          postgres    false    214            �            1259    24613    ratings    TABLE     �   CREATE TABLE public.ratings (
    id integer NOT NULL,
    book_id integer,
    score integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ratings_score_check CHECK (((score >= 1) AND (score <= 5)))
);
    DROP TABLE public.ratings;
       public         heap    postgres    false            �            1259    24612    ratings_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.ratings_id_seq;
       public          postgres    false    219                       0    0    ratings_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.ratings_id_seq OWNED BY public.ratings.id;
          public          postgres    false    218            �            1259    24597    reviews    TABLE     �   CREATE TABLE public.reviews (
    id integer NOT NULL,
    book_id integer,
    review_text text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.reviews;
       public         heap    postgres    false            �            1259    24596    reviews_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.reviews_id_seq;
       public          postgres    false    217                       0    0    reviews_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;
          public          postgres    false    216            o           2604    24590    books id    DEFAULT     d   ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);
 7   ALTER TABLE public.books ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            t           2604    24616 
   ratings id    DEFAULT     h   ALTER TABLE ONLY public.ratings ALTER COLUMN id SET DEFAULT nextval('public.ratings_id_seq'::regclass);
 9   ALTER TABLE public.ratings ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            q           2604    24600 
   reviews id    DEFAULT     h   ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);
 9   ALTER TABLE public.reviews ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217                      0    24587    books 
   TABLE DATA           _   COPY public.books (id, title, author, isbn, published_date, cover_url, created_at) FROM stdin;
    public          postgres    false    215                    0    24613    ratings 
   TABLE DATA           A   COPY public.ratings (id, book_id, score, created_at) FROM stdin;
    public          postgres    false    219   �                 0    24597    reviews 
   TABLE DATA           S   COPY public.reviews (id, book_id, review_text, created_at, updated_at) FROM stdin;
    public          postgres    false    217                      0    0    books_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.books_id_seq', 24, true);
          public          postgres    false    214                       0    0    ratings_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.ratings_id_seq', 2, true);
          public          postgres    false    218                        0    0    reviews_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.reviews_id_seq', 17, true);
          public          postgres    false    216            x           2606    24595    books books_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.books DROP CONSTRAINT books_pkey;
       public            postgres    false    215            ~           2606    24620    ratings ratings_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.ratings DROP CONSTRAINT ratings_pkey;
       public            postgres    false    219            z           2606    24606    reviews reviews_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public            postgres    false    217            |           2606    24627    reviews unique_review_per_book 
   CONSTRAINT     \   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT unique_review_per_book UNIQUE (book_id);
 H   ALTER TABLE ONLY public.reviews DROP CONSTRAINT unique_review_per_book;
       public            postgres    false    217            �           2606    24621    ratings ratings_book_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.ratings DROP CONSTRAINT ratings_book_id_fkey;
       public          postgres    false    215    3192    219                       2606    24607    reviews reviews_book_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_book_id_fkey;
       public          postgres    false    3192    217    215               �   x����N!�kx
^ �\~�M�Q+F�.&����Ř�hgw�s��)GT��\������\+	��`��h���a�������(�s��>D��V��S� WYƺ��{~+N�� ���
!Z��hj�C�K�FdW������K쥴1�ǷK�쮥#�I�|+�C��e�
8��(���*�/E������O�R�	��R            x������ � �           x��WMo�F=ۿ��Y,Y��-h�E�Р�ŗ���X�����C��Xߛ%)�(R HB���}�͛����/��<_�ޜ߾Y\�������z~y�<���ƭ�_}�ZS�Tt�(Cm|+ц"�M�Ϯpv��u���b9�Y^��߸uzs��:Y�ެ�r)|�'EeS�?7����y>6.Daۮ�b(�Њ���Y�>���
���&���\!�\׎�#��VH���T����Ҽ�I�{��J��a���z���m�g�_�ീ
y��Z$fm��<�P���#��2�&"٬���	e�R�N��Ƥ2ڍ�|r���^:.�w�M��ڽh��?�,���;�k��8W4�$�z�Σ��R��Np!��vx��P��" jB�!~���&��h�LmM$B��v#S�l���݄�#�����W|G��Y� �M��Cz"g����@��S�;�&�g3*��_�Rb�lMU0c|�: �e쿴���+�;(D(b�0j�5�@x/�3��l�(�v]y�q�ʏ *�+���3q�#�Ro5U$h�l&�R1QK�d�Es�a�^+~윕?z�����w���:�jB��b�B���YQ&�Ea�"vYQ�dʛ28j*��"�N{�:͠��.�%a%�'�fJ4d�[����,
2\��(�6qg�v�+�ؤPo��N�����Df)$�o9#��h��Xc��ԃ�B�?xH�!�d�l����ׇ����.l�h���F5yЕ�R4�S�Fs�eD����-������j����8�q����!
�.;�M`� RP���\���4Q�Ӗ��FZ���o���	�"�{ݒ�ϋUj��B�i���;���3ꁙj��h�6?�c�	� �6*/<�02n�%�r���_\����o�:]��\�<�.������HV���� �,��k*"7Y�p��l�&�7��08�����2d�'P�����粟A *�|R��L�9Q��s��%i�{(�3;�u>����b�/9��j��4���zŇ0Lr"�|:���pD=H��\Ŗ΅r g?e�ǆ�!�I�Q��qDV�I�ν����&~���a+
�wa�	dw0���O�6e����[p��������y@�n�Q��2�Ϝ}�s$2M����.0���$MnL�mk�)�
���k�� IN��P��s���jh)v��H���Y�h�Y~D�Om�^6�oRB����5m�z���7e�V��(��������'B5�\�'�Ioجك�8�]��^�LZ�r�XW�R݇����=t8�N:�bB}r�q�{�
Z}�e�0�bF���B�1�f.3���iH�R�	��՚���w���:6V��j?���lI`���S�ʆa�p��^�촇�n��q��à�7���'YY��0Ǒ�4M�#-L�M|qpsU������f.qVO;��֛F3S3�4S"&�B[XNF����n�<��ᒍ)�H�"�o]�D��$RNNt0��Y!FoԷ18Q�,L�=�m�5/j�!�@D�Q�����h:��L]��*����Cv۳�����a!x!�A3r��H^y?f�Ϣ�3��a��z�|�r�����77"?�J\�cDz8�S�!�d����J�_؀J9�`@
G�Xt�B�iX-Fw�@��7C��Nڂ�x�I�t����~�OJ��eoe&_ڌZ��8=��V`�:� �ic���ǩ��a�7�n�8/�F�0���4� \�������r���r�X�/.�W˛�ӻ����I�j     